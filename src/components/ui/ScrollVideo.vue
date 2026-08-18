<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'
import type { Component } from 'vue'
import { gsap, ScrollTrigger } from '@/animations/gsap'
import { useScrollVideoManager, type ScrollVideoState } from '@/composables/useScrollVideoManager'

interface ScrollyVideoInstance {
  setVideoPercentage: (
    percentage: number,
    options?: { jump?: boolean; transitionSpeed?: number },
  ) => void
}

const props = withDefaults(defineProps<{
  id: string
  src: string
  priority?: number
  triggerSelector?: string
  start?: string
  end?: string
  scrub?: number
  transitionSpeed?: number
}>(), {
  priority: 0,
  triggerSelector: '',
  start: 'top bottom',
  end: 'bottom top',
  scrub: 0.1,
  transitionSpeed: 64,
})

const root = ref<HTMLElement | null>(null)
const scrollyVideo = ref<ScrollyVideoInstance | null>(null)
const scrollyComponent = shallowRef<Component | null>(null)
const state = ref<ScrollVideoState>('idle')
const shouldMount = ref(false)
const isActive = ref(false)
const isDesktop = ref(false)

const manager = useScrollVideoManager()
let proximityObserver: IntersectionObserver | undefined
let releaseTimer: number | undefined
let mediaQuery: MediaQueryList | undefined
let scrollTween: gsap.core.Tween | undefined
let readyResolve: (() => void) | undefined

const options = computed(() => ({
  src: props.src,
  sticky: false,
  full: false,
  cover: false,
  trackScroll: false,
  lockScroll: false,
  useWebCodecs: true,
  transitionSpeed: props.transitionSpeed,
  frameThreshold: 0.002,
  onReady: () => readyResolve?.(),
}))

const triggerElement = () => {
  if (!root.value || !props.triggerSelector) return root.value
  return root.value.closest(props.triggerSelector) ?? root.value
}

const createScrollControl = () => {
  if (scrollTween || !isDesktop.value) return
  const trigger = triggerElement()
  if (!trigger) return
  const progress = { value: 0 }

  scrollTween = gsap.to(progress, {
    value: 1,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start: props.start,
      end: props.end,
      scrub: props.scrub,
      onEnter: () => manager.activate(props.id),
      onEnterBack: () => manager.activate(props.id),
      onLeave: () => manager.deactivate(props.id),
      onLeaveBack: () => manager.deactivate(props.id),
    },
    onUpdate: () => {
      if (!isActive.value) return
      scrollyVideo.value?.setVideoPercentage(progress.value, {
        jump: false,
        transitionSpeed: props.transitionSpeed,
      })
    },
  })
  ScrollTrigger.refresh()
}

const mountVideo = async () => {
  if (!isDesktop.value) throw new Error('ScrollVideo is disabled on mobile')
  state.value = 'decoding'
  const module = await import('scrolly-video/dist/ScrollyVideo.vue.js')
  scrollyComponent.value = module.default as Component
  const ready = new Promise<void>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error(`Timeout decoding ${props.id}`)), 15000)
    readyResolve = () => {
      window.clearTimeout(timeout)
      resolve()
    }
  })
  shouldMount.value = true
  await nextTick()
  await ready
  readyResolve = undefined
  state.value = 'ready'
  createScrollControl()
}

const releaseVideo = () => {
  scrollTween?.scrollTrigger?.kill()
  scrollTween?.kill()
  scrollTween = undefined
  shouldMount.value = false
  scrollyComponent.value = null
  scrollyVideo.value = null
  isActive.value = false
  state.value = 'idle'
}

const setupObserver = () => {
  proximityObserver?.disconnect()
  if (!isDesktop.value || !root.value) return
  const observedElement = triggerElement()
  if (!observedElement) return

  proximityObserver = new IntersectionObserver(([entry]) => {
    if (!entry) return
    window.clearTimeout(releaseTimer)

    if (entry.isIntersecting) {
      const distance = Math.abs(entry.boundingClientRect.top)
      manager.requestDecode(props.id, distance)
      return
    }

    releaseTimer = window.setTimeout(() => manager.release(props.id), 1800)
  }, { rootMargin: '100% 0px 100% 0px' })

  proximityObserver.observe(observedElement)
}

const updateDesktopState = () => {
  const nextDesktop = Boolean(mediaQuery?.matches)
    && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (nextDesktop === isDesktop.value) return
  isDesktop.value = nextDesktop

  if (nextDesktop) setupObserver()
  else {
    proximityObserver?.disconnect()
    manager.release(props.id)
  }
}

onMounted(() => {
  if (typeof window.matchMedia !== 'function' || typeof window.IntersectionObserver !== 'function') {
    isDesktop.value = false
    return
  }

  mediaQuery = window.matchMedia('(min-width: 38.0625rem)')
  isDesktop.value = mediaQuery.matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  manager.register({
    id: props.id,
    priority: props.priority,
    distance: Number.POSITIVE_INFINITY,
    state: state.value,
    load: mountVideo,
    release: releaseVideo,
    setActive: (active) => { isActive.value = active },
  })

  mediaQuery.addEventListener('change', updateDesktopState)
  setupObserver()
})

onBeforeUnmount(() => {
  window.clearTimeout(releaseTimer)
  proximityObserver?.disconnect()
  mediaQuery?.removeEventListener('change', updateDesktopState)
  manager.unregister(props.id)
})
</script>

<template>
  <div ref="root" class="scroll-video" :data-state="state" aria-hidden="true">
    <component
      :is="scrollyComponent"
      v-if="shouldMount && scrollyComponent"
      ref="scrollyVideo"
      v-bind="options"
    />
  </div>
</template>

<style scoped lang="scss">
.scroll-video :deep([data-scrolly-container]),
.scroll-video :deep(video),
.scroll-video :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}

.scroll-video {
  overflow: visible;
}

.scroll-video :deep([data-scrolly-container]) { position: static !important; }
.scroll-video :deep(video),
.scroll-video :deep(canvas) { display: block; object-fit: contain !important; }

@media (max-width: 38rem), (prefers-reduced-motion: reduce) {
  .scroll-video { display: none; }
}
</style>
