<script setup lang="ts">
import { ref } from 'vue'
import ProjectPlayer from './ProjectPlayer.vue'
import { useDecorativeVideo } from '@/composables/useDecorativeVideo'
import doubleChainsVideo from '@/assets/animations/double-chain.mp4'

const showcase = ref<HTMLElement | null>(null)
const chainsPlayer = ref<HTMLVideoElement | null>(null)
useDecorativeVideo(chainsPlayer, {
  target: () => showcase.value?.closest('.projects-page') ?? showcase.value,
  threshold: .02,
})
</script>

<template>
  <div ref="showcase" class="projects-showcase">
    <div class="projects-showcase__chains" aria-hidden="true">
      <video ref="chainsPlayer" :src="doubleChainsVideo" muted loop playsinline preload="metadata" />
    </div>
    <ProjectPlayer class="projects-showcase__player" />
  </div>
</template>

<style scoped lang="scss">
.projects-showcase {
  position: relative;
  isolation: isolate;
  padding: clamp(1rem, 4vw, 4rem);
  border: 1px solid var(--border);
  background:
    radial-gradient(circle at 50% 0, rgb(23 60 255 / 13%), transparent 35rem),
    rgb(3 3 3 / 68%);
}

.projects-showcase__chains {
  position: absolute;
  z-index: 0;
  inset: clamp(-5.5rem, -6vw, -2.5rem) clamp(-14rem, -14vw, -5rem);
  overflow: hidden;
  pointer-events: none;
}

.projects-showcase__chains::after {
  position: absolute;
  content: '';
  inset: 0;
  background:
    repeating-radial-gradient(circle at 20% 30%, rgb(255 255 255 / 5%) 0 1px, transparent 1px 4px),
    rgb(0 0 0 / 44%);
  mix-blend-mode: multiply;
  opacity: .72;
}

.projects-showcase__chains video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.12);
  filter: brightness(.38) contrast(1.22) saturate(.7);
}

.projects-showcase__player { position: relative; z-index: 1; }

@media (prefers-reduced-motion: reduce) {
  .projects-showcase__chains { display: none; }
}
</style>
