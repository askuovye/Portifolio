<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'light' | 'blue' }>(), { tone: 'light' })
</script>

<template><span class="retro-tag" :class="`retro-tag--${tone}`"><slot /></span></template>

<style scoped>
.retro-tag { display: inline-flex; padding: .22rem .45rem; border: 1px solid currentColor; color: var(--text-secondary); font-family: var(--font-mono); font-size: .65rem; line-height: 1; text-transform: uppercase; }
.retro-tag--blue { color: var(--accent-bright); }
</style>
