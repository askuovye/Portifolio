<script setup lang="ts">
import { Icon } from '@iconify/vue'

withDefaults(defineProps<{
  title?: string
  closeLabel?: string
}>(), {
  title: 'untitled.exe',
  closeLabel: 'Fechar janela',
})
</script>

<template>
  <div class="retro-window">
    <div class="retro-window__bar">
      <span>{{ title }}</span>
      <span class="retro-window__close" role="img" :aria-label="closeLabel">
        <Icon class="retro-window__close-icon" icon="material-symbols:close" />
      </span>
    </div>
    <div class="retro-window__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.retro-window {
  border: 1px solid #c8c8c8;
  background: #050505;
  box-shadow: 7px 8px 0 rgb(23 60 255 / 20%), 14px 15px 25px rgb(0 0 0 / 45%);
}

.retro-window__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2rem;
  padding: 0.24rem 0.3rem 0.24rem 0.7rem;
  background: var(--accent);
  color: white;
  font-family: var(--font-mono);
  font-size: clamp(0.67rem, 1.2vw, 0.85rem);
  line-height: 1;
}

.retro-window__close {
  display: grid;
  width: 1.35rem;
  height: 1.35rem;
  place-items: center;
  border: 1px solid #050505;
  background: #bdbdbd;
  box-shadow: inset 1px 1px white, inset -1px -1px #444;
  color: #050505;
  font-size: 1rem;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }

  &:active {
    box-shadow: inset 1px 1px #444, inset -1px -1px white;
    border-top-color: #404040;
    border-left-color: #404040;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }
}

.retro-window__close-icon {
  width: 0.95rem;
  height: 0.95rem;
}

.retro-window__content {
  position: relative;
  overflow: hidden;
}
</style>
