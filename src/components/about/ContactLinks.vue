<script setup lang="ts">
const links = ['LinkedIn', 'GitHub', 'Email', 'WhatsApp', 'Currículo']
</script>

<template>
  <section>
    <h2>Onde me achar?</h2>
    <p v-for="link in links" :key="link">{{ link }}</p>
  </section>
</template>
