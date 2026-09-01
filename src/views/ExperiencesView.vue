<script setup lang="ts">
import CareerExperience from '@/components/experiences/CareerExperience.vue'
import ExperienceDetails from '@/components/experiences/ExperienceDetails.vue'
import ExperienceHero from '@/components/experiences/ExperienceHero.vue'
import ExperienceScrollDecoration from '@/components/experiences/ExperienceScrollDecoration.vue'
</script>

<template>
  <div class="experience-page">
    <ExperienceScrollDecoration />
    <ExperienceHero class="experience-page__hero" />
    <div class="experience-page__content">
      <CareerExperience />
      <ExperienceDetails />
    </div>
  </div>
</template>

<style scoped lang="scss">
.experience-page {
  position: relative;
  isolation: isolate;
}

.experience-page__hero,
.experience-page__content { position: relative; z-index: 1; }

.experience-page__content {
  padding: clamp(3rem, 7vw, 7rem) clamp(1rem, 4vw, 4rem);
}
</style>
