import { readonly, ref } from 'vue'

export type ScrollVideoState = 'idle' | 'queued' | 'decoding' | 'ready' | 'active' | 'error'

interface ScrollVideoEntry {
  id: string
  priority: number
  distance: number
  state: ScrollVideoState
  load: () => Promise<void>
  release: () => void
  setActive: (active: boolean) => void
}

const entries = new Map<string, ScrollVideoEntry>()
const queue = new Set<string>()
const activeId = ref<string | null>(null)
const decodingId = ref<string | null>(null)

const processQueue = async () => {
  if (decodingId.value) return

  const next = [...queue]
    .map((id) => entries.get(id))
    .filter((entry): entry is ScrollVideoEntry => Boolean(entry))
    .sort((a, b) => b.priority - a.priority || a.distance - b.distance)[0]

  if (!next) return

  queue.delete(next.id)
  decodingId.value = next.id
  next.state = 'decoding'

  try {
    await next.load()
    next.state = 'ready'
  } catch {
    next.state = 'error'
  } finally {
    decodingId.value = null
    void processQueue()
  }
}

export function useScrollVideoManager() {
  const register = (entry: ScrollVideoEntry) => {
    entries.set(entry.id, entry)
  }

  const unregister = (id: string) => {
    queue.delete(id)
    const entry = entries.get(id)
    if (activeId.value === id) activeId.value = null
    entry?.release()
    entries.delete(id)
  }

  const requestDecode = (id: string, distance = Number.POSITIVE_INFINITY) => {
    const entry = entries.get(id)
    if (!entry || ['queued', 'decoding', 'ready', 'active'].includes(entry.state)) return
    entry.distance = distance
    entry.state = 'queued'
    queue.add(id)
    void processQueue()
  }

  const activate = (id: string) => {
    if (activeId.value === id) return
    if (activeId.value) entries.get(activeId.value)?.setActive(false)
    activeId.value = id
    const entry = entries.get(id)
    if (entry) {
      entry.state = 'active'
      entry.setActive(true)
    }
  }

  const deactivate = (id: string) => {
    if (activeId.value !== id) return
    entries.get(id)?.setActive(false)
    activeId.value = null
  }

  const release = (id: string) => {
    if (decodingId.value === id) return
    const entry = entries.get(id)
    if (!entry) return
    queue.delete(id)
    deactivate(id)
    entry.release()
    entry.state = 'idle'
  }

  return {
    activeId: readonly(activeId),
    decodingId: readonly(decodingId),
    register,
    unregister,
    requestDecode,
    activate,
    deactivate,
    release,
  }
}
