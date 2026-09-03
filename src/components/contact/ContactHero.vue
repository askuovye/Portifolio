<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'
import { useI18n } from 'vue-i18n'
import skullVideo from '@/assets/animations/skull.mp4'
import { useDecorativeVideo } from '@/composables/useDecorativeVideo'
import { useEnterMotion } from '@/composables/useEnterMotion'

const contactHero = ref<HTMLElement | null>(null)
const skullPlayer = ref<HTMLVideoElement | null>(null)
useDecorativeVideo(skullPlayer, { target: contactHero, threshold: .02 })

const { enter } = useEnterMotion(.44)
const { t } = useI18n()
</script>

<template>
  <div ref="contactHero" class="contact-hero">
    <div class="contact-hero__skull" aria-hidden="true">
      <video ref="skullPlayer" class="decorative-video-edge-fade" :src="skullVideo" muted loop playsinline preload="metadata" />
    </div>
    <motion.p class="contact-hero__eyebrow" v-bind="enter(.03)">
      <span>//</span> {{ t('contact.hero.eyebrow') }}
    </motion.p>
    <motion.h1 id="contact-title" class="contact-hero__title" v-bind="enter(.12)">
      <span>{{ t('contact.hero.title') }}</span>
      <strong>{{ t('contact.hero.headingFirst') }}<br>{{ t('contact.hero.headingSecond') }}</strong>
    </motion.h1>
    <motion.p class="contact-hero__intro" v-bind="enter(.22)">
      <span aria-hidden="true" />
      {{ t('contact.hero.descriptionFirst') }}<br>{{ t('contact.hero.descriptionSecond') }}
    </motion.p>
  </div>
</template>

<style scoped lang="scss">
.contact-hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  min-width: 0;
  min-height: clamp(32rem, 62vh, 46rem);
  isolation: isolate;
}

.contact-hero__skull {
  position: absolute;
  z-index: -1;
  bottom: -38%;
  left: clamp(-20rem, -16vw, -11rem);
  width: clamp(38rem, 58vw, 62rem);
  height: 145%;
  pointer-events: none;
}

.contact-hero__skull::after {
  position: absolute;
  inset: -8%;
  background:
    repeating-radial-gradient(circle at 20% 30%, rgb(255 255 255 / 5%) 0 1px, transparent 1px 4px),
    rgb(0 0 0 / 44%);
  mix-blend-mode: multiply;
  opacity: .72;
  content: '';
}

.contact-hero__skull video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.12);
  filter: brightness(.38) contrast(1.22) saturate(.7);
}

.contact-hero__eyebrow {
  margin: 0;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: .68rem;
  font-weight: 400;
  letter-spacing: .12em;
  line-height: 1.4;
  text-transform: uppercase;
}

.contact-hero__eyebrow span { color: var(--accent-bright); }

.contact-hero__title {
  margin: clamp(2.5rem, 6vw, 5.5rem) 0 0;
  font-family: var(--font-display);
  font-size: clamp(4.8rem, 7.5vw, 7.8rem);
  font-weight: 400;
  letter-spacing: -.035em;
  line-height: .77;
  text-transform: uppercase;
}

.contact-hero__title span,
.contact-hero__title strong {
  display: block;
  color: var(--text-primary);
  font: inherit;
}

.contact-hero__title strong {
  margin-top: .24em;
  color: var(--accent-bright);
}

.contact-hero__intro {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: .7rem;
  align-items: start;
  margin: auto 0 0;
  color: var(--text-secondary);
  font-size: clamp(.88rem, 1.15vw, 1rem);
  line-height: 1.65;
}

.contact-hero__intro > span {
  width: .42rem;
  height: .42rem;
  margin-top: .45rem;
  background: var(--accent-bright);
  animation: contact-dot-pulse 1.8s ease-in-out infinite;
}

@keyframes contact-dot-pulse {
  0%, 100% {
    box-shadow: 0 0 0 rgb(49 87 255 / 0%);
    opacity: .72;
    transform: scale(1);
  }
  50% {
    box-shadow:
      0 0 .4rem rgb(225 231 255 / 100%),
      0 0 1.15rem rgb(125 149 255 / 100%),
      0 0 2.8rem rgb(49 87 255 / 82%);
    opacity: 1;
    transform: scale(1.24);
  }
}

@media (max-width: 64rem) {
  .contact-hero { min-height: 34rem; }
}

@media (max-width: 40rem) {
  .contact-hero { min-height: 29rem; }

  .contact-hero__title {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    margin-top: 2.5rem;
    font-size: min(3.25rem, 12.2vw);
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-hero__skull { display: none; }
  .contact-hero__intro > span { animation: none; }
}
</style>
