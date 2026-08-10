<script setup lang="ts">
defineProps<{
  title: string
  technologies: string[]
  description: string
  status?: string
}>()
</script>

<template>
  <article>
    <h2>{{ title }}</h2>
    <p>{{ technologies.join(', ') }}</p>
    <p>{{ description }}</p>
    <p v-if="status">{{ status }}</p>
    <p>GitHub</p>
  </article>
</template>
