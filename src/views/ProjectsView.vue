<script setup lang="ts">
import ProjectsHero from '@/components/projects/ProjectsHero.vue'
import ProjectPlayer from '@/components/projects/ProjectPlayer.vue'
</script>

<template>
  <div class="projects-page">
    <ProjectsHero />
    <div class="projects-page__player">
      <ProjectPlayer />
    </div>
  </div>
</template>

<style scoped lang="scss">
.projects-page { border-inline: 1px solid var(--border); }
.projects-page__player {
  padding: clamp(1rem, 4vw, 4rem);
  border-top: 1px solid var(--border);
  background:
    radial-gradient(circle at 50% 0, rgb(23 60 255 / 13%), transparent 35rem),
    var(--background);
}
</style>
