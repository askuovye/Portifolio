<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { motion } from 'motion-v'
import FakeCaptcha from './FakeCaptcha.vue'
import { useEnterMotion } from '@/composables/useEnterMotion'
import { useDecorativeVideo } from '@/composables/useDecorativeVideo'
import chainsHorizontalVideo from '@/assets/animations/chains-horizontal.mp4'
import doubleGlobeImage from '@/assets/elements/double-globe.jpg'
import legoSkeletonImage from '@/assets/elements/lego-skeleton.png'
import captcha1Image from '@/assets/photos/captcha1.jpeg'
import captcha2Image from '@/assets/photos/captcha2.jpeg'
import captcha3Image from '@/assets/photos/captcha3.jpg'
import captcha4Image from '@/assets/photos/captcha4.jpeg'
import captcha5Image from '@/assets/photos/captcha5.jpeg'
import captcha6Image from '@/assets/photos/captcha6.jpeg'
import captcha7Image from '@/assets/photos/captcha7.jpeg'
import captcha8Image from '@/assets/photos/captcha8.jpeg'
import captchaCenterImage from '@/assets/photos/center-image.jpeg'

const { enter } = useEnterMotion(.7)
const captchaImages = [
  { src: captcha1Image },
  { src: captcha2Image },
  { src: captcha3Image },
  { src: captcha4Image },
  { src: captchaCenterImage },
  { src: captcha5Image },
  { src: captcha6Image },
  { src: captcha7Image },
  { src: captcha8Image },
]
const section = ref<HTMLElement | null>(null)
const captcha = ref<InstanceType<typeof FakeCaptcha> | null>(null)
const chainsPlayer = ref<HTMLVideoElement | null>(null)
const isDesktop = ref(false)
let desktopMedia: MediaQueryList | undefined
useDecorativeVideo(chainsPlayer, { target: section, enabled: isDesktop, threshold: .08 })

defineExpose({
  getRevealElement: () => captcha.value?.$el as HTMLElement | undefined,
})

const updateDesktop = () => {
  isDesktop.value = Boolean(desktopMedia?.matches)
}

onMounted(() => {
  if (typeof window.matchMedia !== 'function' || typeof window.IntersectionObserver !== 'function') return
  desktopMedia = window.matchMedia('(min-width: 38.0625rem)')
  desktopMedia.addEventListener('change', updateDesktop)
  updateDesktop()
})

onBeforeUnmount(() => {
  desktopMedia?.removeEventListener('change', updateDesktop)
})
</script>

<template>
  <section ref="section" class="about-intro" aria-labelledby="about-title">
    <div class="about-intro__copy">
      <motion.p class="about-intro__eyebrow" v-bind="enter(0.05)">// ABOUT_ME.TXT</motion.p>
      <motion.h1 id="about-title" v-bind="enter(0.38)">João<br><span>Fortes</span></motion.h1>
      <motion.p class="about-intro__role" v-bind="enter(0.2)">Desenvolvedor Full Stack — Laravel & Vue.js</motion.p>
      <motion.p class="about-intro__description" v-bind="enter(0.28)">Construindo do banco de dados à interface. Graduando em Engenharia de Software em Guarapuava, PR.</motion.p>
    </div>
    <FakeCaptcha ref="captcha" class="captcha" :images="captchaImages" />
    <img class="about-intro__double-globe" :src="doubleGlobeImage" alt="" aria-hidden="true">
    <img class="about-intro__lego-skeleton" :src="legoSkeletonImage" alt="" aria-hidden="true">
    <div v-if="isDesktop" class="about-intro__chains" aria-hidden="true">
      <video
        ref="chainsPlayer"
        :src="chainsHorizontalVideo"
        muted
        loop
        playsinline
        preload="metadata"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.about-intro {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(20rem, 31rem);
  align-items: center;
  gap: clamp(3rem, 8vw, 8rem);
  min-height: clamp(42rem, 75vh, 54rem);
  padding: clamp(3rem, 7vw, 7rem) clamp(1rem, 5vw, 5rem);
  overflow: visible;
  background:
    radial-gradient(circle at 75% 45%, rgb(23 60 255 / 13%), transparent 26rem),
    var(--background);
}

.about-intro__copy,
.captcha { position: relative; z-index: 2; }

.about-intro__double-globe {
  position: absolute;
  z-index: 1;
  top: clamp(1.75rem, 2vw, 6rem);
  left: clamp(1rem, 5vw, 5rem);
  width: clamp(10rem, 16vw, 14rem);
  height: auto;
  mix-blend-mode: screen;
  pointer-events: none;
  user-select: none;
}

.about-intro__lego-skeleton {
  position: absolute;
  z-index: 3;
  top: 35%;
  left: 60%;
  width: clamp(4.75rem, 7vw, 7rem);
  height: auto;
  animation: lego-skeleton-float 5s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
}

@keyframes lego-skeleton-float {
  0%, 100% { transform: translate(-50%, -50%) translateY(.4rem) rotate(-4deg); }
  50% { transform: translate(-50%, -50%) translateY(-.65rem) rotate(3deg); }
}

.about-intro__chains {
  position: absolute;
  z-index: 1;
  top: clamp(3rem, -7vw, -3.5rem);
  right: clamp(-20rem, -16vw, -8rem);
  width: clamp(50rem, 50vw, 50rem);
  height: clamp(12rem, 16vw, 15rem);
  overflow: hidden;
  transform: rotate(40deg);
  transform-origin: center;
  pointer-events: none;
}

.about-intro__chains video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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
  .about-intro__chains { display: none; }
  .about-intro__double-globe { display: none; }
  .about-intro__lego-skeleton { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .about-intro__lego-skeleton {
    animation: none;
    transform: translate(-50%, -50%) rotate(-2deg);
  }
}
</style>
