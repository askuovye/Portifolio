<script setup lang="ts">
import { motion, useReducedMotion } from 'motion-v'

const props = defineProps<{ playing: boolean }>()
const prefersReducedMotion = useReducedMotion()

const bars = [
  { idle: .28, levels: [.28, .82, .46, 1, .38], duration: .82 },
  { idle: .52, levels: [.52, 1, .36, .74, .58], duration: .68 },
  { idle: .38, levels: [.38, .66, 1, .42, .82], duration: .76 },
  { idle: .72, levels: [.72, .32, .88, .5, 1], duration: .64 },
  { idle: .46, levels: [.46, .92, .58, 1, .3], duration: .88 },
  { idle: .62, levels: [.62, .4, 1, .68, .34], duration: .72 },
  { idle: .34, levels: [.34, .78, .44, .9, .56], duration: .8 },
]

const animationFor = (bar: typeof bars[number], index: number) => {
  if (!props.playing || prefersReducedMotion.value) {
    return {
      animate: { scaleY: bar.idle, opacity: props.playing ? 1 : .58 },
      transition: { duration: prefersReducedMotion.value ? .01 : .24, ease: [0.22, 1, 0.36, 1] },
    }
  }

  return {
    animate: { scaleY: bar.levels, opacity: [1, .78, 1, .86, 1] },
    transition: {
      duration: bar.duration,
      delay: index * -.09,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop' as const,
    },
  }
}
</script>

<template>
  <span
    class="equalizer"
    :class="{ 'equalizer--playing': playing }"
    :data-state="playing ? 'playing' : 'paused'"
    aria-hidden="true"
  >
    <motion.i
      v-for="(bar, index) in bars"
      :key="index"
      v-bind="animationFor(bar, index)"
    />
  </span>
</template>

<style scoped lang="scss">
.equalizer {
  display: inline-flex;
  align-items: flex-end;
  flex: 0 0 auto;
  gap: 2px;
  width: 26px;
  height: 1.1rem;
  overflow: hidden;
  line-height: 0;
  vertical-align: middle;
}

.equalizer i {
  display: block;
  flex: 0 0 2px;
  width: 2px;
  height: 100%;
  border-radius: 1px 1px 0 0;
  background: repeating-linear-gradient(
    to top,
    currentcolor 0 2px,
    transparent 2px 3px
  );
  filter: drop-shadow(0 0 2px currentcolor);
  transform: scaleY(.25);
  transform-origin: bottom;
  will-change: transform, opacity;
}

.equalizer--playing i { filter: drop-shadow(0 0 3px currentcolor); }

@media (prefers-reduced-motion: reduce) {
  .equalizer i { will-change: auto; }
}
</style>
