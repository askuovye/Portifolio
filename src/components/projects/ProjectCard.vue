<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { motion, useReducedMotion } from 'motion-v'
import { Icon } from '@iconify/vue'
import { interactionSpring, reducedMotionTransition } from '@/animations/motion'

export interface Project {
  id: string
  title: string
  slug: string
  image: string
  description: string
  technologies: string[]
  github?: string
  demo?: string
  category: string
}

const props = defineProps<{
  project: Project
}>()

const prefersReducedMotion = useReducedMotion()
const projectHref = computed(() => props.project.demo ?? `/projects/${props.project.slug}`)
const linkComponent = computed(() => props.project.demo ? 'a' : RouterLink)
const linkProps = computed(() => props.project.demo
  ? { href: projectHref.value, target: '_blank', rel: 'noopener noreferrer' }
  : { to: projectHref.value })

const cardVariants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -5, scale: 1 },
  press: { scale: 0.992 },
}

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
}

const titlebarVariants = {
  rest: { filter: 'brightness(1)' },
  hover: { filter: 'brightness(1.12)' },
}
</script>

<template>
  <div class="project-reveal">
    <motion.article
      class="project-card"
      initial="rest"
      animate="rest"
      :while-hover="prefersReducedMotion ? undefined : 'hover'"
      :while-press="prefersReducedMotion ? undefined : 'press'"
      :variants="cardVariants"
      :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
    >
      <component
        :is="linkComponent"
        v-bind="linkProps"
        class="project-card__main-link"
        :aria-label="`${project.title}: ver projeto`"
      >
        <motion.header
          class="project-card__titlebar"
          :variants="titlebarVariants"
          :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
        >
          <span class="project-card__title">{{ project.title }}</span>
          <span class="project-card__close" aria-hidden="true">×</span>
        </motion.header>

        <div class="project-card__screen">
          <motion.img
            class="project-card__image"
            :src="project.image"
            :alt="`Captura de tela do projeto ${project.title}`"
            loading="lazy"
            :variants="imageVariants"
            :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
          />
          <span class="project-card__grain" aria-hidden="true" />
          <span class="project-card__scanlines" aria-hidden="true" />
          <span class="project-card__category">{{ project.category }}</span>
        </div>

        <div class="project-card__body">
          <p class="project-card__description">{{ project.description }}</p>
          <ul class="project-card__tags" aria-label="Tecnologias utilizadas">
            <li v-for="technology in project.technologies" :key="technology">
              [ {{ technology }} ]
            </li>
          </ul>
        </div>
      </component>

      <a
        v-if="project.github"
        class="project-card__github"
        :href="project.github"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="`Abrir código de ${project.title} no GitHub`"
      >
        <Icon icon="simple-icons:github" aria-hidden="true" />
        GitHub
      </a>
    </motion.article>
  </div>
</template>

<style scoped lang="scss">
.project-reveal {
  min-width: 0;
}

.project-card {
  position: relative;
  border: 1px solid #bcbcbc;
  background: #050505;
  box-shadow: 7px 8px 0 rgb(23 60 255 / 18%);
  color: var(--text-primary);
  transform-origin: center bottom;
}

.project-card__main-link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.project-card__main-link:focus-visible,
.project-card__github:focus-visible {
  outline: 2px solid white;
  outline-offset: 3px;
}

.project-card__titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 2.25rem;
  padding: .35rem .4rem .35rem .75rem;
  background: var(--accent);
  color: white;
  font-family: var(--font-mono);
  font-size: clamp(.72rem, 1.25vw, .9rem);
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
}

.project-card__title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.project-card__close {
  display: grid;
  flex: 0 0 auto;
  width: 1.45rem;
  height: 1.45rem;
  margin-left: .75rem;
  place-items: center;
  border: 1px solid #111;
  background: #c7c7c7;
  box-shadow: inset 1px 1px white, inset -1px -1px #555;
  color: #080808;
  font-size: 1.2rem;
  line-height: 1;
}

.project-card__screen {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid #777;
  background: #111;
}

.project-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(.18) contrast(1.12);
}

.project-card__grain,
.project-card__scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.project-card__grain {
  opacity: .08;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: screen;
}

.project-card__scanlines {
  opacity: .13;
  background: repeating-linear-gradient(0deg, transparent 0 3px, #000 3px 4px);
}

.project-card__category {
  position: absolute;
  right: .6rem;
  bottom: .55rem;
  padding: .2rem .35rem;
  border: 1px solid rgb(255 255 255 / 65%);
  background: rgb(0 0 0 / 72%);
  color: white;
  font-size: .6rem;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.project-card__body {
  padding: .9rem;
}

.project-card__description {
  min-height: 3.2em;
  margin: 0 0 .85rem;
  color: var(--text-secondary);
  font-size: .78rem;
  line-height: 1.55;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: .4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.project-card__tags li {
  padding: .25rem .4rem;
  border: 1px solid #777;
  color: #e9e9e9;
  font-family: var(--font-mono);
  font-size: .63rem;
  line-height: 1;
  text-transform: uppercase;
}

.project-card__github {
  position: absolute;
  z-index: 2;
  right: .85rem;
  bottom: .85rem;
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: .65rem;
  text-decoration: none;
  text-transform: uppercase;
}

.project-card__github:hover {
  color: white;
}

.project-card:has(.project-card__github) .project-card__tags {
  padding-right: 4.5rem;
}
</style>
