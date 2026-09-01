<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'
import { useEnterMotion } from '@/composables/useEnterMotion'
import { useDecorativeVideo } from '@/composables/useDecorativeVideo'
import computerVideo from '@/assets/animations/computer.mp4'

const { enter } = useEnterMotion(.7)
const section = ref<HTMLElement | null>(null)
const computerPlayer = ref<HTMLVideoElement | null>(null)
useDecorativeVideo(computerPlayer, { target: section, threshold: .08 })
</script>

<template>
  <section ref="section" class="projects-hero" aria-labelledby="projects-title">
    <div class="projects-hero__content">
      <motion.h1 id="projects-title" v-bind="enter(0.38)">Projetos</motion.h1>
      <div class="projects-hero__copy">
        <motion.p v-bind="enter(0.14)">Desenvolvo sites, sistemas, aplicações e até games no meu tempo livre.</motion.p>
        <motion.p v-bind="enter(0.2)">Meus principais sistemas. Vamos dar uma olhada?</motion.p>
      </div>
    </div>
    <motion.div class="projects-hero__computer" v-bind="enter(.16, { scale: .9 })" aria-hidden="true">
      <video ref="computerPlayer" :src="computerVideo" muted loop playsinline preload="metadata" />
    </motion.div>
  </section>
</template>

<style scoped lang="scss">
.projects-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(13rem, 31rem);
  align-items: center;
  gap: clamp(1.25rem, 3vw, 2.5rem);
  padding: clamp(4rem, 9vw, 8rem) clamp(1rem, 4vw, 4rem);
}

.projects-hero__content,
.projects-hero__computer { position: relative; z-index: 1; }

.projects-hero h1 {
  margin: 0;
  font-size: clamp(4rem, 11vw, 10rem);
  line-height: .78;
}

.projects-hero__copy {
  display: grid;
  gap: .65rem;
  max-width: 44rem;
}

.projects-hero p { margin: 0; line-height: 1.65; }
.projects-hero p:last-child { color: var(--text-secondary); }

.projects-hero__computer {
  display: grid;
  width: min(100%, 28.6rem);
  place-self: center;
  place-items: center;
}

.projects-hero__computer video {
  display: block;
  width: 100%;
  max-height: 23.4rem;
  object-fit: contain;
  filter: contrast(1.08) brightness(.88);
}

@media (max-width: 38rem) {
  .projects-hero { grid-template-columns: 1fr; }
  .projects-hero__computer { width: min(19.5rem, 83vw); }
}

@media (prefers-reduced-motion: reduce) {
  .projects-hero__computer video { display: none; }
}
</style>
