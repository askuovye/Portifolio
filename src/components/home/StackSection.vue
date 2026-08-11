<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { motion, useReducedMotion } from 'motion-v'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { stackGroups } from '@/data/stack'
import { gsap } from '@/animations/gsap'
import { interactionSpring, reducedMotionTransition } from '@/animations/motion'
import { useGsapContext } from '@/composables/useGsapContext'

const section = ref<HTMLElement | null>(null)
const prefersReducedMotion = useReducedMotion()

const cardVariants = {
  rest: { y: 0 },
  hover: { y: -3 },
}

const iconVariants = {
  rest: { x: 0 },
  hover: { x: 2 },
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
      duration: 0.48,
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
      <div v-for="group in stackGroups" :key="group.id" class="stack-card-shell">
        <motion.article
          class="stack-card"
          :initial="'rest'"
          :animate="'rest'"
          :while-hover="prefersReducedMotion ? undefined : 'hover'"
          :variants="cardVariants"
          :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
        >
          <span class="stack-card__index" aria-hidden="true">[ {{ String(stackGroups.indexOf(group) + 1).padStart(2, '0') }} ]</span>

          <motion.div
            class="stack-card__icons"
            :variants="iconVariants"
            :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
            aria-hidden="true"
          >
            <Icon
              v-for="technology in group.technologies"
              :key="technology.icon"
              :icon="technology.icon"
              :class="`stack-card__icon--${technology.tone}`"
            />
          </motion.div>

          <div class="stack-card__names">
            <span v-for="technology in group.technologies" :key="technology.name">
              {{ technology.name }}
            </span>
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
  padding: clamp(1.5rem, 3vw, 2.5rem) clamp(.85rem, 2vw, 1.5rem);
  border: 1px solid var(--border);
  background: rgb(3 3 3 / 72%);
}

.stack__title {
  margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
}

.stack__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(.65rem, 1.5vw, 1.25rem);
}

.stack-card-shell {
  min-width: 0;
}

.stack-card {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 9.5rem;
  padding: 1.15rem;
  overflow: hidden;
  border: 1px solid #454545;
  border-radius: 0;
  background:
    linear-gradient(135deg, rgb(49 87 255 / 5%), transparent 42%),
    #070707;
  box-shadow: inset 0 0 2.5rem rgb(255 255 255 / 1.5%);
  cursor: default;
  transition: border-color 180ms ease, background-color 180ms ease;
}

.stack-card::after {
  position: absolute;
  inset: 0;
  opacity: .055;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  content: '';
  pointer-events: none;
}

.stack-card:hover {
  border-color: var(--accent-bright);
  background-color: #090b13;
}

.stack-card__index {
  position: absolute;
  top: .55rem;
  right: .65rem;
  color: #686868;
  font-size: .58rem;
  letter-spacing: .08em;
}

.stack-card__icons {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: .65rem;
  padding-right: 1rem;
  border-right: 1px solid #303030;
  font-size: clamp(1.55rem, 2.5vw, 2.25rem);
}

.stack-card__icons svg {
  filter: grayscale(.25);
}

.stack-card__icon--blue { color: var(--accent-bright); }
.stack-card__icon--light { color: #dedede; }
.stack-card__icon--red { color: #ba392c; }

.stack-card__names {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  gap: .25rem;
  padding-left: 1rem;
  color: var(--text-primary);
  font-size: clamp(.82rem, 1.25vw, 1.05rem);
  line-height: 1.25;
  text-transform: uppercase;
}

@include breakpoint-down($breakpoint-tablet) {
  .stack__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@include breakpoint-down($breakpoint-mobile) {
  .stack { padding-inline: .75rem; }
  .stack__grid { grid-template-columns: 1fr; }
  .stack-card { min-height: 7.5rem; }
  .stack-card__icons { flex-direction: row; font-size: 1.7rem; }
}
</style>
