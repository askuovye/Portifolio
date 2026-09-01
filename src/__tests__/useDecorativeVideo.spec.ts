import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, ref, toRef } from 'vue'
import { mount } from '@vue/test-utils'
import { useDecorativeVideo } from '@/composables/useDecorativeVideo'

const Harness = defineComponent({
  props: {
    enabled: { type: Boolean, default: true },
  },
  setup(props) {
    const player = ref<HTMLVideoElement | null>(null)
    const target = ref<HTMLElement | null>(null)
    useDecorativeVideo(player, {
      target,
      enabled: toRef(props, 'enabled'),
      threshold: .25,
    })
    return { player, target }
  },
  template: '<div ref="target"><video ref="player" /></div>',
})

describe('useDecorativeVideo', () => {
  let visibilityState: DocumentVisibilityState = 'visible'
  let reducedMotion = false
  let reducedMotionListener: (() => void) | undefined
  const observers: Array<{
    callback: IntersectionObserverCallback
    options?: IntersectionObserverInit
    observe: ReturnType<typeof vi.fn>
    disconnect: ReturnType<typeof vi.fn>
  }> = []
  const removeMediaListener = vi.fn()

  beforeEach(() => {
    visibilityState = 'visible'
    reducedMotion = false
    observers.length = 0
    reducedMotionListener = undefined
    removeMediaListener.mockClear()

    vi.spyOn(document, 'visibilityState', 'get').mockImplementation(() => visibilityState)
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined)
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined)

    vi.stubGlobal('IntersectionObserver', class {
      callback: IntersectionObserverCallback
      options?: IntersectionObserverInit
      observe = vi.fn()
      disconnect = vi.fn()

      constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
        this.callback = callback
        this.options = options
        observers.push(this)
      }
    })

    vi.stubGlobal('matchMedia', vi.fn(() => ({
      get matches() { return reducedMotion },
      addEventListener: (_event: string, listener: () => void) => {
        reducedMotionListener = listener
      },
      removeEventListener: removeMediaListener,
    })))
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('plays only while intersecting, visible and motion is allowed', () => {
    const wrapper = mount(Harness)
    const observer = observers[observers.length - 1]
    const player = wrapper.get('video').element as HTMLVideoElement

    expect(observer?.observe).toHaveBeenCalledWith(wrapper.get('div').element)
    expect(observer?.options?.threshold).toBe(.25)
    observer?.callback([{ isIntersecting: true } as IntersectionObserverEntry], observer as unknown as IntersectionObserver)
    expect(player.play).toHaveBeenCalledTimes(1)

    visibilityState = 'hidden'
    document.dispatchEvent(new Event('visibilitychange'))
    expect(player.pause).toHaveBeenCalled()

    visibilityState = 'visible'
    document.dispatchEvent(new Event('visibilitychange'))
    expect(player.play).toHaveBeenCalledTimes(2)

    reducedMotion = true
    reducedMotionListener?.()
    expect(player.pause).toHaveBeenCalledTimes(3)

    wrapper.unmount()
  })

  it('reacts to enablement changes and cleans up observers and listeners', async () => {
    const wrapper = mount(Harness, { props: { enabled: false } })
    const player = wrapper.get('video').element as HTMLVideoElement

    expect(observers).toHaveLength(0)
    await wrapper.setProps({ enabled: true })
    await nextTick()

    const observer = observers[observers.length - 1]
    observer?.callback([{ isIntersecting: true } as IntersectionObserverEntry], observer as unknown as IntersectionObserver)
    expect(player.play).toHaveBeenCalledTimes(1)

    await wrapper.setProps({ enabled: false })
    await nextTick()
    expect(observer?.disconnect).toHaveBeenCalled()

    wrapper.unmount()
    expect(player.pause).toHaveBeenCalled()
    expect(removeMediaListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
