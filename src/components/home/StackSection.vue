<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { motion, useReducedMotion } from 'motion-v'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import stickerImage from '@/assets/elements/sticker.png'
import stickerFrame2 from '@/assets/elements/sticker-frame-2.png'
import stickerFrame3 from '@/assets/elements/sticker-frame-3.png'
import { stackGroups } from '@/data/stack'
import { gsap } from '@/animations/gsap'
import { interactionSpring, reducedMotionTransition } from '@/animations/motion'
import { useGsapContext } from '@/composables/useGsapContext'

const section = ref<HTMLElement | null>(null)
const prefersReducedMotion = useReducedMotion()

const cardVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -8, scale: 1.015 },
}

const iconVariants = {
  rest: { rotate: 0 },
  hover: { rotate: -4 },
}

const groupLabels: Record<string, string> = {
  frontend: 'frontend',
  backend: 'backend',
  database: 'database',
  tooling: 'Ferramentas',
}

useGsapContext(section, ({ reducedMotion }) => {
  const title = section.value?.querySelector('.stack__title')
  const cards = section.value?.querySelectorAll('.stack-card-shell')
  if (!title || !cards?.length) return

  if (reducedMotion) {
    gsap.set([title, ...cards], { clearProps: 'opacity,transform' })
    return
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: section.value,
      start: 'top 82%',
      once: true,
    },
  })
    .from(title, {
      y: 18,
      opacity: 0,
      duration: 0.42,
      ease: 'power3.out',
    })
    .from(cards, {
      y: 25,
      opacity: 0,
      duration: 0.2,
      stagger: 0.1,
      ease: 'power3.out',
    }, '-=0.12')
})
</script>

<template>
  <section ref="section" class="stack" aria-labelledby="stack-title">
    <div id="stack-title" class="stack__title">
      <SectionTitle :level="2">Minha Stack</SectionTitle>
    </div>

    <div class="stack__grid">
      <div
        v-for="(group, index) in stackGroups"
        :key="group.id"
        class="stack-card-shell"
        :class="`stack-card-shell--${index + 1}`"
      >
        <motion.article
          class="stack-card"
          :initial="'rest'"
          :animate="'rest'"
          :while-hover="prefersReducedMotion ? undefined : 'hover'"
          :variants="cardVariants"
          :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
        >
          <div class="stack-card__papers" aria-hidden="true">
            <img class="stack-card__paper stack-card__paper--default" :src="stickerImage" alt="">
            <img class="stack-card__paper stack-card__paper--frame-2" :src="stickerFrame2" alt="">
            <img class="stack-card__paper stack-card__paper--frame-3" :src="stickerFrame3" alt="">
          </div>

          <div class="stack-card__content">
            <div class="stack-card__meta">
              <span>{{ groupLabels[group.id] }}</span>
              <span aria-hidden="true">{{ String(index + 1).padStart(2, '0') }} / {{ String(stackGroups.length).padStart(2, '0') }}</span>
            </div>

            <div class="stack-card__technologies">
              <div v-for="technology in group.technologies" :key="technology.name" class="stack-card__technology">
                <motion.span
                  class="stack-card__icon"
                  :variants="iconVariants"
                  :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
                  aria-hidden="true"
                >
                  <Icon :icon="technology.icon" />
                </motion.span>
                <span class="stack-card_name">{{ technology.name }}</span>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.stack {
  position: relative;
  z-index: 2;
  isolation: isolate;
  padding: clamp(2rem, 4vw, 4rem) clamp(.35rem, 2vw, 2rem);
  overflow: hidden;
  border: 1px solid var(--border);
  background:
    linear-gradient(rgb(255 255 255 / 2%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 2%) 1px, transparent 1px),
    #030303;
  background-size: 32px 32px;
}

.stack__title {
  position: relative;
  z-index: 2;
  margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
}

.stack__grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(4rem, 3vw, 1rem);
  max-width: 80rem;
  margin-inline: auto;
}

.stack-card-shell {
  --card-angle: 0deg;
  min-width: 0;
  transform: rotate(var(--card-angle));
  transform-origin: 50% 72%;
}

.stack-card-shell--1, .stack-card-shell--4 { --card-angle: -1.1deg; }
.stack-card-shell--2, .stack-card-shell--3 { --card-angle: .8deg; }

.stack-card {
  position: relative;
  aspect-ratio: 4 / 3;
  cursor: default;
}

.stack-card__papers,
.stack-card__paper {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
}

.stack-card__paper {
  transform: scale(134%);
  object-fit: contain;
  filter: contrast(1.08);
}

.stack-card__paper--frame-2,
.stack-card__paper--frame-3 {
  opacity: 0;
}

.stack-card:hover .stack-card__paper--default {
  animation: hide-default-sticker 80ms linear forwards;
}

.stack-card:hover .stack-card__paper--frame-2 {
  animation: show-sticker-frame-2 520ms steps(1, end) forwards;
}

.stack-card:hover .stack-card__paper--frame-3 {
  animation: show-sticker-frame-3 520ms steps(1, end) forwards;
  
}

.stack-card__content {
  position: absolute;
  z-index: 1;
  left: -10002%;
  inset: 24% 28% 22% 8%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #111;
  transform: rotate(-.25deg);
}

.stack-card__meta {
  display: flex;
  justify-content: space-between;
  padding-bottom: .45rem;
  border-bottom: 1px solid rgb(0 0 0 / 40%);
  font-size: clamp(.48rem, .85vw, .72rem);
  font-weight: 700;
  letter-spacing: .12em;
  text-transform: uppercase;
  transition: transform 2ms ease;
}

.stack-card:hover .stack-card__meta {
  transform: translateX(2rem);
}

.stack-card__technologies {
  display: grid;
  grid-template-columns: repeat(2, minmax(2, 1fr));
  gap: clamp(.25rem, .1vw, .1rem);
}


.stack-card__technology {
  display: flex;
  align-items: center;
  gap: clamp(.35rem, .7vw, .7rem);
  min-width: 0;
  font-size: clamp(.72rem, 1.45vw, 1.25rem);
  font-weight: 800;
  letter-spacing: -.04em;
  text-transform: uppercase;
  transition: transform 2ms ease, font-size 2ms ease, letter-spacing 2ms ease;
}

.stack-card:hover .stack-card__technology {
  gap: .15rem;
  letter-spacing: -.02em;
  transform: translateX(2rem);
  font-size: 1rem;
}

.stack-card__icon {
  display: grid;
  flex: 0 0 auto;
  width: clamp(1.8rem, 3.4vw, 3rem);
  height: clamp(1.8rem, 3.4vw, 3rem);
  font-size: 222%;
}

.stack-card_name {
  font-size: 105%;
  font-weight: 1000;
}

@keyframes hide-default-sticker {
  to { opacity: 0; }
}

@keyframes show-sticker-frame-2 {
  0%, 54% { opacity: 1; }
  55%, 100% { opacity: 0; }
}

@keyframes show-sticker-frame-3 {
  0%, 54% { opacity: 0; }
  55%, 100% { opacity: 1; }
}

.stack-card-shell:has(.stack-card:hover) {
  animation: stack-card-flip 860ms steps(2, jump-none) infinite;
  animation-delay: 300ms;
  animation-fill-mode: both;
}

@keyframes stack-card-flip {
  0% {
    transform: rotate(calc(var(--card-angle) + 3deg));
  }
  100% {
    transform: rotate(calc(var(--card-angle) - 3deg));
  }
}

@media (prefers-reduced-motion: reduce) {
  .stack-card-shell:has(.stack-card:hover) {
    animation: none;
  }

  .stack-card:hover .stack-card__paper--default,
  .stack-card:hover .stack-card__paper--frame-2 {
    animation: none;
    opacity: 0;
  }

  .stack-card:hover .stack-card__paper--frame-3 {
    animation: none;
    opacity: 1;
  }
}

@include breakpoint-down($breakpoint-tablet) {
  .stack__grid { gap: .1rem; }
}

@include breakpoint-down($breakpoint-mobile) {
  .stack { padding-inline: .75rem; }
  .stack__grid { grid-template-columns: 1fr; }
  .stack-card-shell { margin-block: -.5rem; }
  .stack-card__technology { font-size: clamp(.78rem, 3.6vw, 1.1rem); }
  .stack-card__icon { width: clamp(2rem, 9vw, 2.8rem); height: clamp(2rem, 9vw, 2.8rem); }
}
</style>
