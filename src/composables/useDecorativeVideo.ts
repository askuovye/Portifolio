import {
  onBeforeUnmount,
  onMounted,
  toValue,
  watch,
  type MaybeRefOrGetter,
  type Ref,
} from 'vue'

interface DecorativeVideoOptions {
  target?: MaybeRefOrGetter<Element | null>
  enabled?: MaybeRefOrGetter<boolean>
  threshold?: number
}

export function useDecorativeVideo(
  player: Ref<HTMLVideoElement | null>,
  options: DecorativeVideoOptions = {},
) {
  const target = options.target ?? player
  const enabled = options.enabled ?? true
  let observer: IntersectionObserver | undefined
  let reducedMotion: MediaQueryList | undefined
  let isIntersecting = false
  let isMounted = false
  let managedPlayer: HTMLVideoElement | null = null

  const syncPlayback = () => {
    const video = managedPlayer
    if (!video) return

    const shouldPlay = toValue(enabled)
      && isIntersecting
      && document.visibilityState === 'visible'
      && !reducedMotion?.matches

    if (shouldPlay) void video.play().catch(() => undefined)
    else video.pause()
  }

  const setupObserver = () => {
    observer?.disconnect()
    observer = undefined
    isIntersecting = false
    managedPlayer?.pause()
    managedPlayer = player.value
    managedPlayer?.pause()

    const observedElement = toValue(target)
    if (
      !isMounted
      || !toValue(enabled)
      || !managedPlayer
      || !observedElement
      || typeof window.IntersectionObserver !== 'function'
    ) return

    observer = new IntersectionObserver(([entry]) => {
      isIntersecting = Boolean(entry?.isIntersecting)
      syncPlayback()
    }, { threshold: options.threshold ?? 0 })

    observer.observe(observedElement)
  }

  watch(
    [player, () => toValue(target), () => toValue(enabled)],
    setupObserver,
    { flush: 'post' },
  )

  onMounted(() => {
    isMounted = true
    document.addEventListener('visibilitychange', syncPlayback)

    if (typeof window.matchMedia === 'function') {
      reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
      reducedMotion.addEventListener('change', syncPlayback)
    }

    setupObserver()
  })

  onBeforeUnmount(() => {
    isMounted = false
    observer?.disconnect()
    document.removeEventListener('visibilitychange', syncPlayback)
    reducedMotion?.removeEventListener('change', syncPlayback)
    managedPlayer?.pause()
    managedPlayer = null
  })
}
