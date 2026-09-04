<script setup lang="ts">
import { ref } from 'vue'
import CertificationsSection from './CertificationsSection.vue'
import EducationSection from './EducationSection.vue'
import strawberryVideo from '@/assets/animations/stawberry.webm'
import { useDecorativeVideo } from '@/composables/useDecorativeVideo'

const strawberryPlayer = ref<HTMLVideoElement | null>(null)
useDecorativeVideo(strawberryPlayer, { threshold: .08 })
</script>

<template>
  <div class="experience-details">
    <EducationSection />
    <video
      ref="strawberryPlayer"
      class="experience-details__strawberry decorative-video-edge-fade"
      :src="strawberryVideo"
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
    />
    <CertificationsSection />
  </div>
</template>

<style scoped lang="scss">
.experience-details {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  border: 1px solid var(--border);
  gap: 1px;
  margin-top: clamp(4rem, 8vw, 8rem);
}

.experience-details > * { min-width: 0; }

.experience-details__strawberry {
  --video-fade-left: 14%;
  --video-fade-right: 14%;
  --video-fade-top: 14%;
  --video-fade-bottom: 10%;

  position: absolute;
  z-index: 2;
  top: clamp(2.25rem, 4vw, 3.5rem);
  left: 50%;
  display: block;
  width: clamp(5.5rem, 8vw, 7.5rem);
  aspect-ratio: 1;
  object-fit: contain;
  animation: strawberry-float 5s ease-in-out infinite;
  pointer-events: none;
  translate: -100% 0;
}

@keyframes strawberry-float {
  0%, 100% { transform: translateY(.4rem) rotate(-4deg); }
  50% { transform: translateY(-.65rem) rotate(3deg); }
}

@media (max-width: 48rem) {
  .experience-details { grid-template-columns: 1fr; }

  .experience-details__strawberry {
    top: 50%;
    right: clamp(1rem, 4vw, 2rem);
    left: auto;
    width: clamp(4.5rem, 18vw, 6rem);
    translate: 0 -50%;
  }
}
@media (max-width: 30rem) {
  .experience-details__strawberry { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .experience-details__strawberry {
    animation: none;
    transform: rotate(-2deg);
  }
}
</style>
