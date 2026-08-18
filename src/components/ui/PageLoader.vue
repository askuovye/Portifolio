<script setup lang="ts">
import { usePageLoader } from '@/composables/usePageLoader'

const { isLoading, progress, progressText, label } = usePageLoader()
</script>

<template>
  <Transition name="page-loader">
    <div v-if="isLoading" class="loader" role="status" aria-live="polite" :aria-label="`Carregando página: ${progressText}%`">
      <div class="loader__terminal">
        <div class="loader__topline">
          <span>// JOAO.DEV</span>
          <span>BOOT_SEQUENCE.EXE</span>
        </div>
        <div class="loader__readout">
          <p>{{ label }}<span aria-hidden="true">_</span></p>
          <strong>{{ progressText }}%</strong>
        </div>
        <div class="loader__track" aria-hidden="true">
          <span :style="{ transform: `scaleX(${progress / 100})` }" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.loader {
  position: fixed;
  z-index: 2000;
  inset: 0;
  display: grid;
  place-items: center;
  padding: var(--site-gutter);
  background:
    linear-gradient(rgb(255 255 255 / 2%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 2%) 1px, transparent 1px),
    #030303;
  background-size: 24px 24px;
}

.loader__terminal { width: min(34rem, 100%); font-family: var(--font-mono); }
.loader__topline { display: flex; justify-content: space-between; padding-bottom: .7rem; border-bottom: 1px solid var(--border); color: var(--text-secondary); font-size: .65rem; letter-spacing: .08em; }
.loader__readout { display: flex; align-items: end; justify-content: space-between; gap: 2rem; padding-block: clamp(2rem, 8vw, 4rem) 1rem; }
.loader__readout p { margin: 0; color: var(--accent-bright); font-size: clamp(.7rem, 2vw, .9rem); letter-spacing: .08em; }
.loader__readout p span { animation: blink 700ms steps(1) infinite; }
.loader__readout strong { color: var(--text-primary); font-size: clamp(2.5rem, 9vw, 5.5rem); font-weight: 400; line-height: .75; }
.loader__track { height: .45rem; overflow: hidden; border: 1px solid var(--border); }
.loader__track span { display: block; width: 100%; height: 100%; background: var(--accent); transform-origin: left; transition: transform 180ms ease-out; }
.page-loader-leave-active { transition: opacity 320ms ease, visibility 320ms; }
.page-loader-leave-to { opacity: 0; visibility: hidden; }
@keyframes blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  .loader__track span, .page-loader-leave-active { transition-duration: 1ms; }
  .loader__readout p span { animation: none; }
}
</style>
