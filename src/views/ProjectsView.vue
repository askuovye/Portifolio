<script setup lang="ts">
import ProjectFilters from '@/components/projects/ProjectFilters.vue'
import ProjectsHero from '@/components/projects/ProjectsHero.vue'
import ProjectsList from '@/components/projects/ProjectsList.vue'
</script>

<template>
  <ProjectsHero />
  <div class="projects-content">
    <ProjectFilters />
    <ProjectsList />
  </div>
</template>
