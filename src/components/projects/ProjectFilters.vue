<script setup lang="ts">
const filters = ['Todos', 'Pessoal', 'Faculdade']
</script>

<template>
  <nav aria-label="Filtrar projetos">
    <button v-for="filter in filters" :key="filter" type="button">{{ filter }}</button>
  </nav>
</template>
