<script setup lang="ts">
import { motion } from 'motion-v'
import FakeCaptcha from './FakeCaptcha.vue'
import { useEnterMotion } from '@/composables/useEnterMotion'

const { enter } = useEnterMotion()
</script>

<template>
  <section class="about-intro" aria-labelledby="about-title">
    <div class="about-intro__copy">
      <motion.p class="about-intro__eyebrow" v-bind="enter(0.05)">// ABOUT_ME.TXT</motion.p>
      <motion.h1 id="about-title" v-bind="enter(0.12)">João<br><span>Fortes</span></motion.h1>
      <motion.p class="about-intro__role" v-bind="enter(0.2)">Desenvolvedor Full Stack — Laravel & Vue.js</motion.p>
      <motion.p class="about-intro__description" v-bind="enter(0.28)">Construindo do banco de dados à interface. Graduando em Engenharia de Software em Guarapuava, PR.</motion.p>
    </div>
    <FakeCaptcha class="captcha"/>
  </section>
</template>

<style scoped lang="scss">
.about-intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 31rem);
  align-items: center;
  gap: clamp(3rem, 8vw, 8rem);
  min-height: clamp(42rem, 75vh, 54rem);
  padding: clamp(3rem, 7vw, 7rem) clamp(1rem, 5vw, 5rem);
  background:
    radial-gradient(circle at 75% 45%, rgb(23 60 255 / 13%), transparent 26rem),
    var(--background);
}

.about-intro__copy {
  width: 100%;
  max-width: 43rem;
  padding-block: clamp(1rem, 3vw, 2.5rem);
}

.about-intro__eyebrow {
  margin: 0 0 clamp(1.75rem, 3vw, 2.5rem);
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: .7rem;
  letter-spacing: .12em;
}

h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(6rem, 13vw, 12rem);
  font-weight: 400;
  letter-spacing: -.035em;
  line-height: .76;
  text-transform: uppercase;
}

h1 span {
  display: inline-block;
  margin-top: .3em;
  color: var(--accent-bright);
}

.about-intro__role {
  max-width: 36rem;
  margin: clamp(1.25rem, 2vw, 2rem) 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
  color: var(--text-primary);
  font-size: clamp(1rem, 2vw, 1.35rem);
  line-height: 1.45;
}

.about-intro__description {
  max-width: 34rem;
  margin: 1.15rem 0 0;
  color: var(--text-secondary);
  font-size: .9rem;
  line-height: 1.75;
}

.captcha{
  transform: rotate(-2deg);
}

@media (max-width: 56rem) {
  .about-intro { grid-template-columns: 1fr; }
  .about-intro :deep(.captcha) { justify-self: center; }
}

@media (max-width: 38rem) {
  .about-intro { min-height: auto; padding-block: 4rem; }
  h1 { font-size: clamp(5rem, 27vw, 8rem); }
  .about-intro__role { margin-top: 3rem; }
}
</style>
