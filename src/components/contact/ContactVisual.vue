<script setup lang="ts">
import { motion } from 'motion-v'
import { useI18n } from 'vue-i18n'
import devSticker from '@/assets/elements/dev-sticker.webp'
import { useEnterMotion } from '@/composables/useEnterMotion'

const { enter } = useEnterMotion(.52)
const { t } = useI18n()
</script>

<template>
  <motion.figure class="contact-visual" v-bind="enter(.18, { rotate: 2 })">
    <img
      :src="devSticker"
      :alt="t('contact.visual.alt')"
    >
  </motion.figure>
</template>

<style scoped lang="scss">
.contact-visual {
  position: relative;
  z-index: 1;
  width: min(40rem, 104%);
  margin: -1.5rem -5% -.75rem auto;
  transform-origin: 50% 55%;
}

.contact-visual img {
  display: block;
  width: 100%;
  height: auto;
  animation: contact-sticker-flip 660ms steps(2, jump-none) infinite;
  animation-fill-mode: both;
  filter: contrast(1.04);
}

@keyframes contact-sticker-flip {
  0% { transform: rotate(1deg); }
  100% { transform: rotate(-1deg); }
}

@media (max-width: 56rem) {
  .contact-visual {
    width: min(42rem, 112%);
    margin: -2rem -6% -1.5rem auto;
  }
}

@media (max-width: 38rem) {
  .contact-visual {
    width: 116%;
    margin: -1rem -8% -1.25rem;
  }

}

@media (prefers-reduced-motion: reduce) {
  .contact-visual img {
    animation: none;
    transform: none;
  }
}
</style>
