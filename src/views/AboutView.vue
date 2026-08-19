<script setup lang="ts">
import AboutIntro from '@/components/about/AboutIntro.vue'
import ContactLinks from '@/components/about/ContactLinks.vue'
import PersonalBackground from '@/components/about/PersonalBackground.vue'
import TechnicalIdentity from '@/components/about/TechnicalIdentity.vue'
import WorkSummary from '@/components/about/WorkSummary.vue'
</script>

<template>
  <div class="about-content">
    <AboutIntro />
    <TechnicalIdentity />
    <div class="about-story-grid">
      <WorkSummary />
      <PersonalBackground />
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

.about-story-grid :deep(.work-summary) { transform: rotate(-1deg); }
.about-story-grid :deep(.personal-background) { margin-top: clamp(2rem, 5vw, 4.5rem); transform: rotate(1deg); }

@media (max-width: 48rem) {
  .about-story-grid { grid-template-columns: 1fr; }
  .about-story-grid :deep(.personal-background) { margin-top: 0; }
}
</style>
