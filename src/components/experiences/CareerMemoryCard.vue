<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { CareerExperience } from '@/data/experiences'
import memoryCardImage from '@/assets/elements/memory-card.png'

const props = defineProps<{
  experience: CareerExperience
  active: boolean
  reading: boolean
}>()

defineEmits<{
  select: []
  navigate: [direction: -1 | 1]
}>()

const tiltElement = ref<HTMLButtonElement | null>(null)
let tiltFrame: number | undefined

const supportsPointerTilt = () => typeof window.matchMedia === 'function'
  && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const updateSelectedTilt = (event: PointerEvent) => {
  if (!props.active || !supportsPointerTilt() || !tiltElement.value) return
  const bounds = tiltElement.value.getBoundingClientRect()
  const centerX = bounds.left + bounds.width / 2
  const centerY = bounds.top + bounds.height / 2
  const normalizedX = Math.max(-.5, Math.min(.5, (event.clientX - centerX) / (window.innerWidth * .65)))
  const normalizedY = Math.max(-.5, Math.min(.5, (event.clientY - centerY) / (window.innerHeight * .65)))
  const maxRotateY = 14
  const rotateX = normalizedY * -16
  const rotateY = normalizedX * maxRotateY * 2
  const objectX = normalizedX * 12
  const objectY = normalizedY * 10
  const contentX = normalizedX * 7
  const contentY = normalizedY * 6
  const pointerX = Math.max(0, Math.min(100, (event.clientX - bounds.left) / bounds.width * 100))
  const pointerY = Math.max(0, Math.min(100, (event.clientY - bounds.top) / bounds.height * 100))

  if (tiltFrame !== undefined) window.cancelAnimationFrame(tiltFrame)
  tiltFrame = window.requestAnimationFrame(() => {
    tiltElement.value?.style.setProperty('--tilt-x', `${rotateX.toFixed(2)}deg`)
    tiltElement.value?.style.setProperty('--tilt-y', `${rotateY.toFixed(2)}deg`)
    tiltElement.value?.style.setProperty('--object-x', `${objectX.toFixed(2)}px`)
    tiltElement.value?.style.setProperty('--object-y', `${objectY.toFixed(2)}px`)
    tiltElement.value?.style.setProperty('--content-x', `${contentX.toFixed(2)}px`)
    tiltElement.value?.style.setProperty('--content-y', `${contentY.toFixed(2)}px`)
    tiltElement.value?.style.setProperty('--pointer-x', `${pointerX.toFixed(1)}%`)
    tiltElement.value?.style.setProperty('--pointer-y', `${pointerY.toFixed(1)}%`)
    tiltFrame = undefined
  })
}

const updateGlobalTiltListener = (active: boolean) => {
  window.removeEventListener('pointermove', updateSelectedTilt)
  if (active) window.addEventListener('pointermove', updateSelectedTilt, { passive: true })
  else resetTilt()
}

onMounted(() => {
  updateGlobalTiltListener(props.active)
  window.addEventListener('blur', resetTilt)
})
watch(() => props.active, updateGlobalTiltListener)

const resetTilt = () => {
  if (tiltFrame !== undefined) window.cancelAnimationFrame(tiltFrame)
  tiltFrame = undefined
  tiltElement.value?.style.setProperty('--tilt-x', '0deg')
  tiltElement.value?.style.setProperty('--tilt-y', '0deg')
  tiltElement.value?.style.setProperty('--object-x', '0px')
  tiltElement.value?.style.setProperty('--object-y', '0px')
  tiltElement.value?.style.setProperty('--content-x', '0px')
  tiltElement.value?.style.setProperty('--content-y', '0px')
  tiltElement.value?.style.setProperty('--pointer-x', '50%')
  tiltElement.value?.style.setProperty('--pointer-y', '50%')
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', updateSelectedTilt)
  window.removeEventListener('blur', resetTilt)
  if (tiltFrame !== undefined) window.cancelAnimationFrame(tiltFrame)
})
</script>

<template>
  <button
    ref="tiltElement"
    class="memory-card"
    :class="{ 'memory-card--active': active, 'memory-card--reading': reading }"
    type="button"
    :aria-label="`Carregar experiência ${experience.company}`"
    :aria-pressed="active"
    :aria-current="active ? 'true' : undefined"
    @click="$emit('select')"
    @keydown.left.prevent="$emit('navigate', -1)"
    @keydown.right.prevent="$emit('navigate', 1)"
  >
    <span class="memory-card__object">
      <img class="memory-card__body" :src="memoryCardImage" alt="" aria-hidden="true">
      <span class="memory-card__content">
        <span class="memory-card__slot">SLOT {{ String(experience.slot).padStart(2, '0') }}</span>
        <span class="memory-card__label">
          <small>CAREER DATA</small>
          <strong :class="{ 'is-long': experience.company.length > 18 }">{{ experience.company }}</strong>
          <span>{{ experience.role }}</span>
          <span>{{ experience.period }}</span>
        </span>
        <span class="memory-card__meta">
          <span>{{ active ? 'ACTIVE SAVE' : (experience.status === 'active' ? 'IN PROGRESS' : 'COMPLETED') }}</span>
          <span>{{ String(experience.skills.length).padStart(2, '0') }} SKILLS</span>
        </span>
        <span class="memory-card__footer">
          <span>{{ experience.saveFile }}</span>
          <i class="memory-card__led" aria-hidden="true" />
        </span>
      </span>
    </span>
  </button>
</template>

<style scoped lang="scss">
.memory-card {
  --lift: 0px;
  --pointer-x: 50%;
  --pointer-y: 50%;
  --object-x: 0px;
  --object-y: 0px;
  --content-x: 0px;
  --content-y: 0px;
  --tilt-x: 0deg;
  --tilt-y: 0deg;
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 1245 / 1263;
  padding: 0;
  border: 0;
  background: transparent;
  color: #101010;
  font-family: var(--font-mono);
  text-align: left;
  perspective: 520px;
  transform: translate3d(0, var(--lift), 0) rotateX(var(--tilt-x)) rotateY(var(--tilt-y));
  transform-style: preserve-3d;
  transition: transform .28s cubic-bezier(.2, .8, .2, 1);
  cursor: pointer;
  scroll-snap-align: center;
}

.memory-card__object {
  position: absolute;
  inset: 0;
  display: block;
  transform: translate3d(var(--object-x), var(--object-y), 0);
  transform-style: preserve-3d;
  filter: drop-shadow(2px 4px 2px rgb(0 0 0 / 42%));
  transition: filter .28s ease, transform .28s ease;
}

.memory-card__body {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
}

.memory-card__body {
  z-index: 1;
  clip-path: inset(3% 0 0);
  filter: drop-shadow(6px 10px 4px rgb(0 0 0 / 68%)) drop-shadow(18px 23px 16px rgb(0 0 0 / 42%));
  transform: translateZ(0);
}

.memory-card:hover,
.memory-card:focus-visible {
  --lift: -10px;
}

.memory-card:hover .memory-card__object,
.memory-card:focus-visible .memory-card__object { filter: drop-shadow(6px 13px 5px rgb(0 0 0 / 62%)); transform: translate3d(var(--object-x), var(--object-y), 9px); }

.memory-card--active .memory-card__body { filter: brightness(1.04) drop-shadow(7px 12px 5px rgb(0 0 0 / 72%)) drop-shadow(20px 26px 18px rgb(0 0 0 / 46%)); }
.memory-card--reading { animation: card-read .34s steps(2, jump-none); }

.memory-card__content {
  position: absolute;
  z-index: 2;
  top: 15%;
  right: 13.5%;
  bottom: 13.5%;
  left: 17%;
  display: flex;
  flex-direction: column;
  transform: translate3d(var(--content-x), var(--content-y), 9px) rotate(-.3deg);
  pointer-events: none;
}

.memory-card__slot { color: #173cff; font-size: clamp(.73rem, .87vw, .95rem); font-weight: 700; letter-spacing: .08em; transform: translateZ(12px); }

.memory-card__label {
  display: flex;
  min-height: 0;
  flex-direction: column;
  gap: clamp(.22rem, .45vw, .42rem);
  margin-top: 11%;
}

.memory-card__label small { font-size: clamp(.56rem, .67vw, .73rem); letter-spacing: .12em; }
.memory-card__label strong { max-width: 100%; margin-top: 2%; font-family: var(--font-mono); font-size: clamp(1.15rem, 1.75vw, 1.65rem); line-height: .92; text-transform: uppercase; }
.memory-card__label strong.is-long { font-size: clamp(.98rem, 1.43vw, 1.33rem); line-height: 1; }
.memory-card__label span { max-width: 95%; font-size: clamp(.63rem, .74vw, .81rem); line-height: 1.25; text-transform: uppercase; }
.memory-card__label span:last-child { margin-top: 3%; }
.memory-card__meta { display: flex; justify-content: space-between; gap: .4rem; margin-top: auto; padding-top: 5%; border-top: 1px solid rgb(20 20 20 / 28%); color: #292929; font-size: clamp(.56rem, .66vw, .7rem); font-weight: 700; }
.memory-card--active .memory-card__meta span:first-child { color: #173cff; }
.memory-card__footer { display: flex; align-items: center; justify-content: space-between; gap: .4rem; margin-top: 5%; font-size: clamp(.53rem, .63vw, .67rem); }
.memory-card__footer > span { overflow-wrap: anywhere; }
.memory-card__led { flex: 0 0 auto; width: .36rem; height: .36rem; border: 1px solid #333; border-radius: 50%; background: #686868; }
.memory-card__led { transform: translateZ(12px); }
.memory-card--active .memory-card__led { background: #3157ff; box-shadow: 0 0 3px rgb(49 87 255 / 65%); }

@keyframes card-read { 50% { filter: brightness(1.08); } }

@media (hover: none), (pointer: coarse) {
  .memory-card { --lift: 0px; --tilt-x: 0deg; --tilt-y: 0deg; }
  .memory-card:active .memory-card__object { transform: translateZ(1px); }
}

@media (prefers-reduced-motion: reduce) {
  .memory-card { transition-duration: .01s; }
  .memory-card, .memory-card:hover, .memory-card:focus-visible { --lift: 0px; --tilt-x: 0deg; --tilt-y: 0deg; transform: none; }
  .memory-card__object, .memory-card:hover .memory-card__object, .memory-card:focus-visible .memory-card__object { transform: none; transition-duration: .01s; }
  .memory-card--reading { animation: none; }
}
</style>
