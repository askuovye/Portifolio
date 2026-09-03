<script setup lang="ts">
import ScrollVideo from '@/components/ui/ScrollVideo.vue'
import canVideo from '@/assets/animations/can.mp4'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <aside class="experience-scroll-decoration" :aria-label="t('experiences.accessibility.scrollAnimation')">
    <ScrollVideo
      id="experience-can"
      class="experience-scroll-decoration__can decorative-video-edge-fade"
      :src="canVideo"
      :priority="9"
      trigger-selector=".experience-page"
      start="top top+=88"
      end="bottom bottom-=48"
    />
  </aside>
</template>

<style scoped lang="scss">
.experience-scroll-decoration {
  position: fixed;
  z-index: 0;
  inset: 0;
  overflow: visible;
  pointer-events: none;
}

.experience-scroll-decoration__can {
  position: absolute;
  top: 50%;
  right: 0;
  width: clamp(14rem, 21vw, 21rem);
  height: clamp(19.6rem, 30.8vw, 30.8rem);
  transform: translate(30%, -50%);
}
</style>
