<script setup lang="ts">
const technologies = ['Vue.js/Vite', 'PHP/Laravel', 'PostgreSQL/MySQL', 'Docker, Git']
</script>

<template>
  <section>
    <h3>Minha Stack</h3>
    <div>
      <p v-for="technology in technologies" :key="technology">{{ technology }}</p>
    </div>
  </section>
</template>
