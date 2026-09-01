<script setup lang="ts">
import { ref } from 'vue'
import AboutIntro from '@/components/about/AboutIntro.vue'
import ContactLinks from '@/components/about/ContactLinks.vue'
import PersonalBackground from '@/components/about/PersonalBackground.vue'
import TechnicalIdentity from '@/components/about/TechnicalIdentity.vue'
import WorkSummary from '@/components/about/WorkSummary.vue'
import { gsap } from '@/animations/gsap'
import { useGsapContext } from '@/composables/useGsapContext'

const page = ref<HTMLElement | null>(null)
const aboutIntro = ref<InstanceType<typeof AboutIntro> | null>(null)
const workSummary = ref<InstanceType<typeof WorkSummary> | null>(null)
const personalBackground = ref<InstanceType<typeof PersonalBackground> | null>(null)

useGsapContext(page, ({ reducedMotion }) => {
  const windows = [
    { element: aboutIntro.value?.getRevealElement(), delay: 0.75 },
    { element: workSummary.value?.getRevealElement(), delay: 0 },
    { element: personalBackground.value?.getRevealElement(), delay: 0 },
  ].filter((window): window is { element: HTMLElement; delay: number } => Boolean(window.element))

  if (!windows.length) return

  if (reducedMotion) {
    gsap.set(windows.map(({ element }) => element), { clearProps: 'clipPath' })
    return
  }

  windows.forEach(({ element, delay }) => {
    gsap.from(element, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power3.inOut',
      clearProps: 'clipPath',
      delay,
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        once: true,
      },
    })
  })
})
</script>

<template>
  <div ref="page" class="about-content">
    <AboutIntro ref="aboutIntro" />
    <TechnicalIdentity />
    <div class="about-story-grid">
      <WorkSummary ref="workSummary" class="about-story-grid__work-summary" />
      <PersonalBackground ref="personalBackground" class="about-story-grid__personal-background" />
    </div>
    <ContactLinks />
  </div>
</template>

<style scoped lang="scss">
.about-story-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: clamp(1.5rem, 4vw, 4rem);
  padding: clamp(3rem, 7vw, 7rem) clamp(1rem, 5vw, 5rem);
  background:
    linear-gradient(rgb(255 255 255 / 1.5%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 1.5%) 1px, transparent 1px),
    var(--background);
  background-size: 28px 28px;
}

.about-story-grid__work-summary { transform: rotate(-1deg); }
.about-story-grid__personal-background { margin-top: clamp(2rem, 5vw, 4.5rem); transform: rotate(1deg); }

@media (max-width: 48rem) {
  .about-story-grid { grid-template-columns: 1fr; }
  .about-story-grid__personal-background { margin-top: 0; }
}
</style>
