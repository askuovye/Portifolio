import { describe, expect, it, vi } from 'vitest'
import { useScrollVideoManager } from '@/composables/useScrollVideoManager'

describe('useScrollVideoManager', () => {
  it('decodes only one video at a time', async () => {
    const manager = useScrollVideoManager()
    const order: string[] = []
    let finishFirst: (() => void) | undefined

    manager.register({
      id: 'queue-test-a',
      priority: 1,
      distance: 100,
      state: 'idle',
      load: () => new Promise<void>((resolve) => {
        order.push('a:start')
        finishFirst = () => {
          order.push('a:end')
          resolve()
        }
      }),
      release: vi.fn(),
      setActive: vi.fn(),
    })

    manager.register({
      id: 'queue-test-b',
      priority: 2,
      distance: 50,
      state: 'idle',
      load: async () => { order.push('b:start') },
      release: vi.fn(),
      setActive: vi.fn(),
    })

    manager.requestDecode('queue-test-a')
    manager.requestDecode('queue-test-b')
    await Promise.resolve()
    expect(order).toEqual(['a:start'])

    finishFirst?.()
    await vi.waitFor(() => expect(order).toEqual(['a:start', 'a:end', 'b:start']))

    manager.unregister('queue-test-a')
    manager.unregister('queue-test-b')
  })
})
