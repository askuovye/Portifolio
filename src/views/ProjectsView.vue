<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ProjectsHero from '@/components/projects/ProjectsHero.vue'
import ProjectPlayer from '@/components/projects/ProjectPlayer.vue'
import doubleChainsVideo from '@/assets/animations/double-chain.mp4'

const page = ref<HTMLElement | null>(null)
const chainsPlayer = ref<HTMLVideoElement | null>(null)
let chainsObserver: IntersectionObserver | undefined

const pauseChains = () => chainsPlayer.value?.pause()

onMounted(() => {
  if (!page.value || !chainsPlayer.value || typeof window.IntersectionObserver !== 'function') return

  chainsObserver = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) void chainsPlayer.value?.play().catch(() => undefined)
    else pauseChains()
  }, { threshold: .02 })

  chainsObserver.observe(page.value)
})

onBeforeUnmount(() => {
  chainsObserver?.disconnect()
  pauseChains()
})
</script>

<template>
  <div ref="page" class="projects-page">
    <ProjectsHero class="projects-page__content" />
    <div class="projects-page__player projects-page__content">
      <div class="projects-page__chains" aria-hidden="true">
        <video ref="chainsPlayer" :src="doubleChainsVideo" muted loop playsinline preload="metadata" />
      </div>
      <ProjectPlayer class="projects-page__player-content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects-page {
  position: relative;
  overflow: visible;
  isolation: isolate;
  background: var(--background);
}

.projects-page__content { position: relative; z-index: 1; }

.projects-page__chains {
  position: absolute;
  z-index: 0;
  inset: clamp(-5.5rem, -6vw, -2.5rem) clamp(-14rem, -14vw, -5rem);
  overflow: hidden;
  pointer-events: none;
}

.projects-page__chains::after {
  position: absolute;
  content: '';
  inset: 0;
  background:
    repeating-radial-gradient(circle at 20% 30%, rgb(255 255 255 / 5%) 0 1px, transparent 1px 4px),
    rgb(0 0 0 / 44%);
  mix-blend-mode: multiply;
  opacity: .72;
}

.projects-page__chains video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.12);
  filter: brightness(.38) contrast(1.22) saturate(.7);
}

.projects-page__player {
  position: relative;
  isolation: isolate;
  padding: clamp(1rem, 4vw, 4rem);
  border: 1px solid var(--border);
  background:
    radial-gradient(circle at 50% 0, rgb(23 60 255 / 13%), transparent 35rem),
    rgb(3 3 3 / 68%);
}

.projects-page__player-content { position: relative; z-index: 1; }

@media (prefers-reduced-motion: reduce) {
  .projects-page__chains { display: none; }
}
</style>
