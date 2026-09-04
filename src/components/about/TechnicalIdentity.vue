<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { motion } from 'motion-v'
import { useI18n } from 'vue-i18n'
import { useEnterMotion } from '@/composables/useEnterMotion'
import { useDecorativeVideo } from '@/composables/useDecorativeVideo'
import hdVideo from '@/assets/animations/hd.webm'
import windowsImage from '@/assets/elements/windows.webp'

const { enter } = useEnterMotion(.7)
const { t } = useI18n()
const section = ref<HTMLElement | null>(null)
const hdPlayer = ref<HTMLVideoElement | null>(null)
const isDesktop = ref(false)
let desktopMedia: MediaQueryList | undefined
useDecorativeVideo(hdPlayer, { target: section, enabled: isDesktop, threshold: .08 })

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
  <div class="technical-identity-shell">
    <section ref="section" class="technical-identity" aria-labelledby="technical-identity-title">
      <div class="technical-identity__content">
        <motion.h3 id="technical-identity-title" v-bind="enter(0.08)">{{ t('about.identity.titleFirst') }}<br>{{ t('about.identity.titleSecond') }}</motion.h3>
        <motion.p v-bind="enter(0.16)">{{ t('about.identity.description') }}</motion.p>
      </div>
    </section>
    <video
      v-if="isDesktop"
      ref="hdPlayer"
      class="technical-identity__hd decorative-video-edge-fade"
      :src="hdVideo"
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
    />
    <img class="technical-identity__windows" :src="windowsImage" alt="" aria-hidden="true">
  </div>
</template>

<style scoped lang="scss">
.technical-identity-shell {
  position: relative;
}

.technical-identity {
  padding: clamp(2rem, 5vw, 5rem);
  background: var(--background);
}

.technical-identity__label {
  margin: 0 0 clamp(2rem, 4vw, 3.5rem);
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: .68rem;
  letter-spacing: .12em;
}

.technical-identity__content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(15rem, .8fr) minmax(18rem, 1.2fr);
  align-items: start;
  gap: clamp(2rem, 8vw, 8rem);
}

.technical-identity__hd {
  position: absolute;
  z-index: 0;
  top: clamp(-7.5rem, -8vw, -6.5rem);
  left: clamp(-6rem, -5vw, -1rem);
  width: clamp(8rem, 15vw, 14rem);
  height: auto;
  object-fit: contain;
  pointer-events: none;
}

.technical-identity__windows {
  position: absolute;
  z-index: 2;
  right: clamp(-5rem, -4vw, -.95rem);
  bottom: clamp(-3rem, -3vw, -1.5rem);
  width: clamp(13rem, 20vw, 15rem);
  height: auto;
  mix-blend-mode: screen;
  pointer-events: none;
  user-select: none;
}

h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 400;
  line-height: .78;
  text-transform: uppercase;
}

.technical-identity__content p {
  max-width: 45rem;
  margin: 0;
  padding-top: .4rem;
  color: var(--text-secondary);
  font-size: clamp(.88rem, 1.2vw, 1rem);
  line-height: 1.8;
}

@media (max-width: 48rem) {
  .technical-identity__content { grid-template-columns: 1fr; }
}

@media (max-width: 38rem) {
  .technical-identity { min-height: auto; }
  .technical-identity__hd { display: none; }
  .technical-identity__windows { right: -.5rem; bottom: -2rem; width: 8rem; }
}
</style>
