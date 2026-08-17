<script setup lang="ts">
withDefaults(defineProps<{ level?: 2 | 3; prefix?: string }>(), { level: 2, prefix: '//' })
</script>

<template><component :is="`h${level}`" class="section-title"><span>{{ prefix }}</span> <slot /></component></template>

<style scoped>
.section-title { color: var(--text-primary); font-family: var(--font-display); font-size: clamp(1.2rem, 2.4vw, 1.8rem); line-height: 1; }
.section-title span { color: var(--accent-bright); }
</style>
