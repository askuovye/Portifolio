import { nextTick, onBeforeUnmount, onMounted, toValue, type MaybeRefOrGetter } from 'vue'
import { gsap } from '@/animations/gsap'

interface GsapSetupOptions {
  context: gsap.Context
  reducedMotion: boolean
}

type GsapSetup = (options: GsapSetupOptions) => void | (() => void)

/**
 * Creates a scoped GSAP context after the component DOM exists.
 * Animations are rebuilt if the reduced-motion preference changes and are
 * completely reverted, including ScrollTriggers, when the component unmounts.
 */
export function useGsapContext(
  scope: MaybeRefOrGetter<Element | null | undefined>,
  setup: GsapSetup,
) {
  let context: gsap.Context | undefined
  let media: gsap.MatchMedia | undefined

  onMounted(async () => {
    await nextTick()

    const scopeElement = toValue(scope)
    if (!scopeElement) return

    context = gsap.context((scopedContext) => {
      if (typeof window.matchMedia !== 'function') {
        setup({ context: scopedContext, reducedMotion: true })
        return
      }

      media = gsap.matchMedia()
      media.add(
        {
          reducedMotion: '(prefers-reduced-motion: reduce)',
          motionAllowed: '(prefers-reduced-motion: no-preference)',
        },
        (mediaContext) => setup({
          context: mediaContext,
          reducedMotion: Boolean(mediaContext.conditions?.reducedMotion),
        }),
      )
    }, scopeElement)
  })

  onBeforeUnmount(() => {
    media?.revert()
    context?.revert()
    media = undefined
    context = undefined
  })
}
