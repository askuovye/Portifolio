<script setup lang="ts"></script>

<template>
  <header>
    <nav aria-label="Navegação principal">
      <RouterLink to="/">Início</RouterLink>
      <RouterLink to="/sobre">Sobre</RouterLink>
      <RouterLink to="/projetos">Projetos</RouterLink>
      <RouterLink to="/experiencias">Experiências</RouterLink>
      <RouterLink to="/contato">Contato</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.router-link-active {
  font-weight: 700;
}
</style>
