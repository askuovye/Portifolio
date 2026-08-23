<script setup lang="ts">
import { motion } from 'motion-v'
import { useEnterMotion } from '@/composables/useEnterMotion'

const { enter } = useEnterMotion()
</script>

<template>
  <section class="projects-hero" aria-labelledby="projects-title">
    <motion.div class="projects-hero__meta" v-bind="enter(.04)">
      <span>ARQUIVO_01</span>
      <span>PROJECTS.DIR</span>
    </motion.div>
    <div class="projects-hero__copy">
      <motion.p v-bind="enter(.08)">PORTFÓLIO / SELECT TRACK</motion.p>
      <motion.h1 id="projects-title" v-bind="enter(.14)">Projetos</motion.h1>
      <motion.p class="projects-hero__intro" v-bind="enter(.22)">
        Sistemas, aplicações e experiências digitais organizados como faixas de um arquivo pessoal.
      </motion.p>
    </div>
    <span class="projects-hero__catalog" aria-hidden="true">DEV.MP3</span>
  </section>
</template>

<style scoped lang="scss">
.projects-hero {
  position: relative;
  min-height: clamp(19rem, 38vw, 34rem);
  padding: clamp(1rem, 3vw, 2.5rem) clamp(1rem, 4vw, 4rem) clamp(3rem, 7vw, 6rem);
  overflow: hidden;
  border: 1px solid var(--border);
  border-bottom: 0;
  background:
    radial-gradient(circle at 78% 45%, rgb(23 60 255 / 22%), transparent 28%),
    linear-gradient(rgb(255 255 255 / 1.5%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 1.5%) 1px, transparent 1px),
    var(--background);
  background-size: auto, 28px 28px, 28px 28px, auto;
}

.projects-hero__meta {
  display: flex;
  position: relative;
  z-index: 2;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: .65rem;
  letter-spacing: .11em;
}

.projects-hero__copy { position: relative; z-index: 2; margin-top: clamp(3.5rem, 8vw, 7rem); }
.projects-hero__copy > p:first-child { color: var(--accent-bright); font-size: .67rem; letter-spacing: .12em; }
.projects-hero h1 { margin: .75rem 0 0; font-size: clamp(5rem, 14vw, 13rem); letter-spacing: -.04em; line-height: .62; }
.projects-hero__intro { max-width: 34rem; margin: clamp(1.75rem, 4vw, 3rem) 0 0; padding-left: 1rem; border-left: 2px solid var(--accent); font-size: clamp(.78rem, 1.25vw, .95rem); line-height: 1.65; }
.projects-hero__catalog { position: absolute; right: -1vw; bottom: -.22em; color: rgb(255 255 255 / 3.2%); font-family: var(--font-display); font-size: clamp(8rem, 24vw, 24rem); line-height: .65; pointer-events: none; }
</style>
