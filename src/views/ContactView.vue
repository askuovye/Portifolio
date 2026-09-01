<script setup lang="ts">
import AvailabilitySection from '@/components/contact/AvailabilitySection.vue'
import ContactHero from '@/components/contact/ContactHero.vue'
import ContactInfo from '@/components/contact/ContactInfo.vue'
import ContactVisual from '@/components/contact/ContactVisual.vue'
</script>

<template>
  <section class="contact-page" aria-labelledby="contact-title">
    <div class="contact-page__layout">
      <ContactHero />
      <div class="contact-page__details">
        <ContactVisual />
        <ContactInfo />
        <AvailabilitySection />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.contact-page {
  position: relative;
  min-height: calc(100dvh - 8.5rem);
  padding: clamp(3rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem) clamp(2rem, 4vw, 3.5rem);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow: visible;
  background: var(--background);
}

.contact-page::before {
  position: absolute;
  top: 18%;
  left: 3%;
  width: clamp(18rem, 38vw, 36rem);
  aspect-ratio: 1;
  border: 1px solid rgb(255 255 255 / 3%);
  border-radius: 50%;
  pointer-events: none;
  content: '';
}

.contact-page__layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.18fr) minmax(24rem, .82fr);
  gap: clamp(2rem, 5vw, 6rem);
  align-items: start;
}

.contact-page__details {
  position: relative;
  display: grid;
  min-width: 0;
  gap: clamp(1.75rem, 3vw, 3rem);
  padding-top: clamp(1rem, 3vw, 2.5rem);
}

@include breakpoint-down($breakpoint-tablet) {
  .contact-page__layout {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  .contact-page__details {
    padding-top: 0;
  }
}

@include breakpoint-down($breakpoint-mobile) {
  .contact-page {
    min-height: auto;
    padding-block: 3rem 2rem;
  }

  .contact-page::before {
    top: 10rem;
    left: -9rem;
  }

  .contact-page__layout { gap: 3.5rem; }
}
</style>
