<script setup lang="ts">
import CertificationsSection from '@/components/experiences/CertificationsSection.vue'
import EducationSection from '@/components/experiences/EducationSection.vue'
import ExperienceHero from '@/components/experiences/ExperienceHero.vue'
import ExperienceTimeline from '@/components/experiences/ExperienceTimeline.vue'
</script>

<template>
  <div class="experience-page">
    <ExperienceHero />
    <div class="experience-page__content">
      <ExperienceTimeline />
      <div class="experience-page__details">
        <EducationSection />
        <CertificationsSection />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.experience-page {
  border-inline: 1px solid var(--border);
}

.experience-page__content {
  padding: clamp(3rem, 7vw, 7rem) clamp(1rem, 4vw, 4rem);
}

.experience-page__details {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1px;
  margin-top: clamp(4rem, 8vw, 8rem);
  border: 1px solid var(--border);
  background: var(--border);
}

@media (max-width: 48rem) {
  .experience-page__details {
    grid-template-columns: 1fr;
  }
}
</style>
