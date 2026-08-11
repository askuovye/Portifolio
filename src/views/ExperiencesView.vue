<script setup lang="ts">
import CertificationsSection from '@/components/experiences/CertificationsSection.vue'
import EducationSection from '@/components/experiences/EducationSection.vue'
import ExperienceHero from '@/components/experiences/ExperienceHero.vue'
import ExperienceTimeline from '@/components/experiences/ExperienceTimeline.vue'
</script>

<template>
  <ExperienceHero />
  <main>
    <ExperienceTimeline />
    <EducationSection />
    <CertificationsSection />
  </main>
</template>
