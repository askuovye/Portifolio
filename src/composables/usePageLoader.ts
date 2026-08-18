import { computed, readonly, ref } from 'vue'

const MINIMUM_VISIBLE_MS = 700
const MAXIMUM_VISIBLE_MS = 3000

const isLoading = ref(true)
const progress = ref(8)
const label = ref('INITIALIZING_SYSTEM')
let startedAt = performance.now()
let maximumTimer: number | undefined
let runId = 0

const clearMaximumTimer = () => {
  if (maximumTimer !== undefined) window.clearTimeout(maximumTimer)
  maximumTimer = undefined
}

const finishRun = (id: number) => {
  if (id !== runId || !isLoading.value) return
  progress.value = 100
  label.value = 'SYSTEM_READY'

  const remaining = Math.max(0, MINIMUM_VISIBLE_MS - (performance.now() - startedAt))
  window.setTimeout(() => {
    if (id !== runId) return
    isLoading.value = false
    clearMaximumTimer()
  }, remaining)
}

export function usePageLoader() {
  const start = (routeLabel = 'PAGE') => {
    runId += 1
    const id = runId
    clearMaximumTimer()
    startedAt = performance.now()
    progress.value = 8
    label.value = `LOADING_${routeLabel.toUpperCase()}`
    isLoading.value = true
    maximumTimer = window.setTimeout(() => finishRun(id), MAXIMUM_VISIBLE_MS)
    return id
  }

  const setProgress = (value: number, nextLabel?: string) => {
    progress.value = Math.min(94, Math.max(progress.value, value))
    if (nextLabel) label.value = nextLabel
  }

  const finish = (id = runId) => finishRun(id)

  return {
    isLoading: readonly(isLoading),
    progress: readonly(progress),
    label: readonly(label),
    progressText: computed(() => String(Math.round(progress.value)).padStart(3, '0')),
    start,
    setProgress,
    finish,
  }
}
