<script setup lang="ts">
defineProps<{ playing: boolean }>()
</script>

<template>
  <span class="equalizer" :class="{ 'equalizer--playing': playing }" aria-hidden="true">
    <i v-for="bar in 5" :key="bar" />
  </span>
</template>

<style scoped lang="scss">
.equalizer {
  display: inline-flex;
  align-items: end;
  gap: 2px;
  width: 1.45rem;
  height: 1.05rem;
}

.equalizer i {
  width: 3px;
  height: 25%;
  background: currentColor;
  box-shadow: 0 0 5px currentColor;
  transform-origin: bottom;
}

.equalizer i:nth-child(2) { height: 65%; }
.equalizer i:nth-child(3) { height: 40%; }
.equalizer i:nth-child(4) { height: 85%; }
.equalizer i:nth-child(5) { height: 55%; }

.equalizer--playing i { animation: equalizer-pulse 680ms steps(4, jump-none) infinite alternate; }
.equalizer--playing i:nth-child(2) { animation-delay: -420ms; animation-duration: 540ms; }
.equalizer--playing i:nth-child(3) { animation-delay: -180ms; animation-duration: 760ms; }
.equalizer--playing i:nth-child(4) { animation-delay: -510ms; animation-duration: 610ms; }
.equalizer--playing i:nth-child(5) { animation-delay: -260ms; animation-duration: 820ms; }

@keyframes equalizer-pulse {
  from { transform: scaleY(.35); }
  to { transform: scaleY(1); }
}

@media (prefers-reduced-motion: reduce) {
  .equalizer--playing i { animation: none; }
}
</style>
