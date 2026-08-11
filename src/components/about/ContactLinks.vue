<script setup lang="ts">
const links = ['LinkedIn', 'GitHub', 'Email', 'WhatsApp', 'Currículo']
</script>

<template>
  <section>
    <h3>Onde me achar?</h3>
    <p v-for="link in links" :key="link">{{ link }}</p>
  </section>
</template>
