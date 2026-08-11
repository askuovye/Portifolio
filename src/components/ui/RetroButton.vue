<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { motion, useReducedMotion } from 'motion-v'
import { interactionSpring, reducedMotionTransition } from '@/animations/motion'

withDefaults(defineProps<{
  to?: string
  href?: string
  variant?: 'primary' | 'secondary'
  arrow?: boolean
  mail?: boolean
}>(), {
  variant: 'secondary',
  arrow: false,
  mail: false,
})

const prefersReducedMotion = useReducedMotion()
</script>

<template>
  <motion.div
    class="retro-button-wrap"
    :while-hover="prefersReducedMotion ? undefined : { x: 4, y: -2 }"
    :while-press="prefersReducedMotion ? undefined : { scale: 0.97 }"
    :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
  >
    <RouterLink v-if="to" class="retro-button" :class="`retro-button--${variant}`" :to="to">
      <span><slot /></span>
      <span v-if="mail" class="retro-button__icon" aria-hidden="true"><Icon icon="mdi:email-outline" /></span>
      <span v-if="arrow" class="retro-button__arrow" aria-hidden="true"><Icon icon="mdi-light:arrow-right" /></span>
    </RouterLink>
    <a v-else class="retro-button" :class="`retro-button--${variant}`" :href="href">
      <span><slot /></span>
      <span v-if="mail" class="retro-button__icon" aria-hidden="true"><Icon icon="mdi:email-outline" /></span>
      <span v-if="arrow" class="retro-button__arrow" aria-hidden="true"><Icon icon="mdi-light:arrow-right" /></span>
    </a>
  </motion.div>
</template>

<style scoped lang="scss">
.retro-button-wrap { display: inline-flex; }
.retro-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.4rem;
  min-height: 3rem;
  padding: 0.7rem 1rem;
  border: 1px solid var(--text-primary);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  line-height: 1;
  text-transform: uppercase;
  transition: color 160ms ease, background-color 160ms ease, border-color 160ms ease;
}
.retro-button--primary { border-color: var(--accent-bright); color: var(--accent-bright); }
.retro-button:hover { background: var(--text-primary); color: #050505; }
.retro-button--primary:hover { background: var(--accent); color: white; }
.retro-button__icon { display: inline-grid; align-items: center; width: 1rem; height: 1rem; }
.retro-button__icon svg { width: 100%; height: 100%; }
.retro-button__arrow { font-size: 1.35rem; transition: transform 160ms ease; }
.retro-button:hover .retro-button__arrow { transform: translateX(0.3rem); }
</style>
