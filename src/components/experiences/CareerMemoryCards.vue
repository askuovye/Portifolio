<script setup lang="ts">
import { computed } from 'vue'
import type { CareerExperience } from '@/data/experiences'
import CareerMemoryCard from './CareerMemoryCard.vue'

const props = defineProps<{
  experiences: CareerExperience[]
  selectedId: string
  reading: boolean
}>()

const emit = defineEmits<{
  select: [id: string]
}>()

const activeIndex = computed(() => {
  const index = props.experiences.findIndex(experience => experience.id === props.selectedId)
  return index < 0 ? 0 : index
})

const selectExperience = (index: number) => {
  const normalizedIndex = (index + props.experiences.length) % props.experiences.length
  const experience = props.experiences[normalizedIndex]
  if (experience) emit('select', experience.id)
}

const previousExperience = () => selectExperience(activeIndex.value - 1)
const nextExperience = () => selectExperience(activeIndex.value + 1)

const getRelativeOffset = (index: number) => {
  const count = props.experiences.length
  let offset = (index - activeIndex.value + count) % count
  if (offset > Math.floor(count / 2)) offset -= count
  return offset
}

const visualSlots: Record<number, { x: string; y: string; scale: number; rotation: string; z: number; opacity: number }> = {
  [-2]: { x: '-24%', y: '18%', scale: .58, rotation: '-2deg', z: 5, opacity: 0 },
  [-1]: { x: '-12%', y: '24%', scale: .68, rotation: '-2.5deg', z: 10, opacity: 1 },
  [0]: { x: '5%', y: '2%', scale: 1, rotation: '-2deg', z: 50, opacity: 1 },
  [1]: { x: '29%', y: '22%', scale: .9, rotation: '2deg', z: 40, opacity: 1 },
  [2]: { x: '48%', y: '28%', scale: .81, rotation: '-1deg', z: 30, opacity: 1 },
  [3]: { x: '64%', y: '34%', scale: .73, rotation: '2.5deg', z: 20, opacity: 1 },
}

const getCardPosition = (index: number) => {
  const offset = getRelativeOffset(index)
  const slot = visualSlots[offset] ?? visualSlots[-2]!
  return {
    offset,
    style: {
      '--carousel-x': slot.x,
      '--carousel-y': slot.y,
      '--carousel-scale': slot.scale,
      '--carousel-rotation': slot.rotation,
      '--carousel-z': slot.z,
      '--carousel-opacity': slot.opacity,
    },
  }
}

const navigate = (index: number, direction: -1 | 1) => {
  selectExperience(index + direction)
  const targetIndex = (index + direction + props.experiences.length) % props.experiences.length
  requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-save-id="${props.experiences[targetIndex]?.id}"]`)?.focus())
}
</script>

<template>
  <div class="career-memory" role="group" aria-label="Career Memory Cards">
    <div class="career-memory__label">
      <span>// PHYSICAL MEMORY</span>
      <span>SELECT SAVE FILE</span>
    </div>
    <div class="career-memory-carousel">
      <button class="career-memory-carousel__arrow career-memory-carousel__arrow--previous" type="button" aria-label="Experiência anterior" @click="previousExperience">
        <span aria-hidden="true">◀</span>
      </button>
      <div class="career-memory-carousel__viewport">
        <div class="career-memory-carousel__stage">
          <div
            v-for="(experience, index) in experiences"
            :key="experience.id"
            class="career-memory-carousel__position"
            :class="{ 'is-active': selectedId === experience.id }"
            :data-offset="getCardPosition(index).offset"
            :style="getCardPosition(index).style"
          >
            <CareerMemoryCard
              :data-save-id="experience.id"
              :experience="experience"
              :active="selectedId === experience.id"
              :reading="reading && selectedId === experience.id"
              @select="selectExperience(index)"
              @navigate="navigate(index, $event)"
            />
          </div>
        </div>
      </div>
      <button class="career-memory-carousel__arrow career-memory-carousel__arrow--next" type="button" aria-label="Próxima experiência" @click="nextExperience">
        <span aria-hidden="true">▶</span>
      </button>
    </div>
    <p class="career-memory__hint">← → NAVIGATE / ENTER TO LOAD</p>
  </div>
</template>

<style scoped lang="scss">
.career-memory { min-width: 0; }
.career-memory__label { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 2.25rem; color: var(--text-secondary); font-size: .65rem; letter-spacing: .1em; }
.career-memory__label span:first-child { color: var(--accent-bright); }

.career-memory-carousel {
  display: grid;
  grid-template-columns: 2.5rem minmax(0, 1fr) 2.5rem;
  align-items: center;
  min-width: 0;
}

.career-memory-carousel__viewport {
  min-width: 0;
  overflow: visible;
  perspective: 900px;
}

.career-memory-carousel__stage {
  position: relative;
  height: clamp(28rem, 36.4vw, 35rem);
  transform-style: preserve-3d;
}

.career-memory-carousel__position {
  position: absolute;
  z-index: var(--carousel-z);
  top: 0;
  left: var(--carousel-x);
  width: clamp(19.6rem, 25.9vw, 23.8rem);
  opacity: var(--carousel-opacity);
  transform: translate3d(0, var(--carousel-y), 0) scale(var(--carousel-scale)) rotate(var(--carousel-rotation));
  transform-origin: 50% 75%;
  transform-style: preserve-3d;
  pointer-events: none;
  transition: transform .45s cubic-bezier(.22, .8, .2, 1), left .45s cubic-bezier(.22, .8, .2, 1), opacity .35s ease;
  will-change: transform, left, opacity;
}

.career-memory-carousel__position[data-offset='-1'],
.career-memory-carousel__position[data-offset='0'],
.career-memory-carousel__position[data-offset='1'],
.career-memory-carousel__position[data-offset='2'],
.career-memory-carousel__position[data-offset='3'] { pointer-events: auto; }

.career-memory-carousel__position[data-offset='1'] :deep(.memory-card__body) {
  filter: brightness(.82) contrast(1.1) drop-shadow(8px 13px 5px rgb(0 0 0 / 72%)) drop-shadow(21px 27px 18px rgb(0 0 0 / 46%));
}
.career-memory-carousel__position[data-offset='1'] :deep(.memory-card__content) { filter: brightness(.82); }

.career-memory-carousel__position[data-offset='2'] :deep(.memory-card__body) {
  filter: brightness(.67) contrast(1.16) drop-shadow(9px 15px 6px rgb(0 0 0 / 76%)) drop-shadow(23px 30px 20px rgb(0 0 0 / 50%));
}
.career-memory-carousel__position[data-offset='2'] :deep(.memory-card__content) { filter: brightness(.67); }

.career-memory-carousel__position[data-offset='3'],
.career-memory-carousel__position[data-offset='-1'] {
  :deep(.memory-card__body) {
    filter: brightness(.52) contrast(1.22) drop-shadow(10px 17px 7px rgb(0 0 0 / 80%)) drop-shadow(26px 34px 22px rgb(0 0 0 / 54%));
  }
  :deep(.memory-card__content) { filter: brightness(.52); }
}

.career-memory-carousel__arrow {
  position: relative;
  z-index: 70;
  display: grid;
  width: 2.25rem;
  height: 3.5rem;
  place-items: center;
  padding: 0;
  border: 1px solid transparent;
  background: transparent;
  color: #777;
  font-size: .72rem;
  cursor: pointer;
  transition: color .18s ease, transform .18s ease, border-color .18s ease;
}

.career-memory-carousel__arrow:hover,
.career-memory-carousel__arrow:focus-visible { border-color: var(--border); color: var(--text-primary); }
.career-memory-carousel__arrow--previous:hover { transform: translateX(-2px); }
.career-memory-carousel__arrow--next:hover { transform: translateX(2px); }
.career-memory-carousel__arrow:active { color: var(--accent-bright); }
.career-memory__hint { margin: .75rem 0 0; color: #676767; font-size: .58rem; letter-spacing: .08em; text-align: right; }

@media (max-width: 64rem) {
  .career-memory-carousel__position[data-offset='3'] { opacity: 0; pointer-events: none; }
  .career-memory-carousel__position[data-offset='2'] { --carousel-x: 62% !important; --carousel-scale: .74 !important; }
}

@media (max-width: 48rem) {
  .career-memory-carousel { grid-template-columns: 2rem minmax(0, 1fr) 2rem; }
  .career-memory-carousel__stage { height: min(112vw, 30rem); }
  .career-memory-carousel__position { width: min(88vw, 23.8rem); }
  .career-memory-carousel__position[data-offset='0'] { --carousel-x: 50% !important; --carousel-y: 0% !important; --carousel-scale: 1 !important; --carousel-rotation: -1deg !important; transform: translate3d(-50%, var(--carousel-y), 0) scale(var(--carousel-scale)) rotate(var(--carousel-rotation)); }
  .career-memory-carousel__position[data-offset='-1'] { --carousel-x: -34% !important; --carousel-y: 14% !important; --carousel-scale: .72 !important; opacity: 1; }
  .career-memory-carousel__position[data-offset='1'] { --carousel-x: 72% !important; --carousel-y: 14% !important; --carousel-scale: .72 !important; opacity: 1; }
  .career-memory-carousel__position[data-offset='2'],
  .career-memory-carousel__position[data-offset='3'],
  .career-memory-carousel__position[data-offset='-2'] { opacity: 0; pointer-events: none; }
}

@media (prefers-reduced-motion: reduce) {
  .career-memory-carousel__position { transition-duration: .01s; }
  .career-memory-carousel__arrow { transition-duration: .01s; }
}
</style>
