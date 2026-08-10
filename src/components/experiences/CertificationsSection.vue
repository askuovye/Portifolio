<script setup lang="ts">
const certifications = [
  'FrontEnd – CodeAcademy 3C',
  'Eletrotécnica – SENAI',
  'Curso de desenvolvimento de jogos – DankiCode',
]
</script>

<template>
  <section>
    <h2>Certificações</h2>
    <p v-for="certification in certifications" :key="certification">{{ certification }}</p>
  </section>
</template>
