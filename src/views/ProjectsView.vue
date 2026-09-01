<script setup lang="ts">
import ProjectsHero from '@/components/projects/ProjectsHero.vue'
import ProjectsShowcase from '@/components/projects/ProjectsShowcase.vue'
</script>

<template>
  <div class="projects-page">
    <ProjectsHero class="projects-page__content" />
    <ProjectsShowcase class="projects-page__content" />
  </div>
</template>

<style scoped lang="scss">
.projects-page {
  position: relative;
  overflow: visible;
  isolation: isolate;
  background: var(--background);
}

.projects-page__content { position: relative; z-index: 1; }
</style>
