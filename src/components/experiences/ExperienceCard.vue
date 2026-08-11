<script setup lang="ts">
defineProps<{
  period: string
  role: string
  company: string
  activities: string[]
}>()
</script>

<template>
  <article>
    <p>{{ period }}</p>
    <h4>{{ role }}</h4>
    <p>{{ company }}</p>
    <ul>
      <li v-for="activity in activities" :key="activity">{{ activity }}</li>
    </ul>
  </article>
</template>
