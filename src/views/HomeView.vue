<script setup lang="ts">
import ContactSection from '@/components/home/ContactSection.vue'
import ExperiencesSection from '@/components/home/ExperiencesSection.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import StackSection from '@/components/home/StackSection.vue'
</script>

<template>
  <HeroSection />
  <main>
    <StackSection />
    <ProjectsSection />
    <ExperiencesSection />
    <ContactSection />
  </main>
</template>
