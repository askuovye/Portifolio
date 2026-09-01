<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { motion, useReducedMotion } from 'motion-v'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import RetroButton from '@/components/ui/RetroButton.vue'
import RetroWindow from '@/components/ui/RetroWindow.vue'
import { gsap } from '@/animations/gsap'
import { interactionSpring, reducedMotionTransition } from '@/animations/motion'
import { useGsapContext } from '@/composables/useGsapContext'
import { projects } from '@/data/projects'

const projectSummaries = projects.map(project => ({
  id: project.id,
  name: project.title,
  image: project.image,
  technologies: project.technologies,
}))

const section = ref<HTMLElement | null>(null)
const prefersReducedMotion = useReducedMotion()

useGsapContext(section, ({ reducedMotion }) => {
  const title = section.value?.querySelector('.projects-section__title')  
  const cards = section.value?.querySelectorAll('.project-summary')
  const footer = section.value?.querySelector('.projects-section__footer')
  if (!title || !cards?.length || !footer) return

  if (reducedMotion) {
    gsap.set([title, ...cards, footer], { clearProps: 'opacity,transform' })
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
      duration: .42,
      ease: 'power3.out',
    })
    .from(cards, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power3.inOut',
      clearProps: 'clipPath',
    }, '<0.08')
    .from(footer, {
      y: 12,
      opacity: 0,
      duration: .38,
      ease: 'power3.out',
    }, '-=.12')
})
</script>

<template>
  <section ref="section" class="projects-section" aria-labelledby="home-projects-title">
    <div id="home-projects-title" class="projects-section__title">
      <SectionTitle :level="2">PROJETOS</SectionTitle>
    </div>

    <div class="projects-section__grid">
      <article
        v-for="(project, index) in projectSummaries"
        :key="project.id"
        class="project-summary"
      >
        <h3 class="project-summary__accessible-title">{{ project.name }}</h3>
        <RetroWindow :title="project.name" close-label="Fechar janela decorativa">
          <div class="project-summary__content">
            <div class="project-summary__screen">
              <img
                :src="project.image"
                :alt="`Captura de tela do projeto ${project.name}`"
                loading="lazy"
              >
              <span class="project-summary__scanlines" aria-hidden="true" />
              <span class="project-summary__number" aria-hidden="true">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
            </div>
            <ul aria-label="Tecnologias utilizadas">
              <li v-for="technology in project.technologies" :key="technology">
                {{ technology }}
              </li>
            </ul>
          </div>
        </RetroWindow>
      </article>
    </div>

    <div class="projects-section__footer">
      <motion.div
        class="projects-section__cta-wrap"
        :while-hover="prefersReducedMotion ? undefined : { x: 5, y: -2 }"
        :while-press="prefersReducedMotion ? undefined : { scale: .98 }"
        :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
      >
        <RetroButton to="/projects" variant="primary" arrow>Ver projetos</RetroButton>
      </motion.div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.projects-section {
  padding: var(--site-gutter);
  border-bottom: 1px solid var(--border);
}

.projects-section__title {
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
}

.projects-section__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 3vw, 1.45rem);
}

.project-summary {
  min-width: 0;
  transition: filter 180ms ease;
}

.project-summary:hover {
  transform: scale(1.025);
  filter: brightness(1.30);
}

.project-summary__accessible-title {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

.project-summary__content {
  padding: 1rem;
  background: #070707;
  border-radius: 6px;
}

.project-summary__screen {
  position: relative;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border: 1px solid #595959;
  background: #111;
}

.project-summary__screen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(.12) contrast(1.12) brightness(.88);
  transition: transform 300ms ease, filter 300ms ease;
}

.project-summary:hover .project-summary__screen img {
  transform: scale(1.05);
  filter: grayscale(0) contrast(1.08) brightness(.98);
}

.project-summary__scanlines {
  position: absolute;
  inset: 0;
  opacity: .12;
  background: repeating-linear-gradient(0deg, transparent 0 3px, #000 3px 4px);
  pointer-events: none;
}

.project-summary__number {
  position: absolute;
  top: .4rem;
  right: .4rem;
  padding: .15rem .3rem;
  border: 1px solid rgb(255 255 255 / 45%);
  background: rgb(0 0 0 / 70%);
  color: #ddd;
  font-family: var(--font-mono);
  font-size: .55rem;
}

.project-summary__content ul {
  display: flex;
  align-items: stretch;
  gap: .35rem;
  margin: .55rem 0 0;
  padding: 0;
  list-style: none;
}

.project-summary__content li {
  flex: 1 1 0;
  min-width: 0;
  padding: .45rem .35rem;
  overflow: hidden;
  border: 1px solid #747474;
  color: #ddd;
  font-family: var(--font-mono);
  font-size: clamp(.6rem, .9vw, .78rem);
  line-height: 1.1;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.project-summary__content li::before,
.project-summary__content li::after {
  color: #888;
}

.project-summary__content li::before { content: '[ '; }
.project-summary__content li::after { content: ' ]'; }

.projects-section__footer {
  display: flex;
  justify-content: flex-end;
  margin-top: clamp(1.5rem, 3vw, 2.5rem);
}

.projects-section__cta-wrap {
  display: inline-flex;
}

.projects-section__cta {
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  min-height: 2.8rem;
  padding: .65rem .85rem;
  border: 1px solid var(--accent-bright);
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: clamp(.68rem, 1vw, .8rem);
  text-decoration: none;
  transition: background-color 160ms ease, color 160ms ease;
}

.projects-section__cta:hover {
  background: var(--accent);
  color: white;
}

.projects-section__cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 3px;
}

@include breakpoint-down($breakpoint-tablet) {
  .projects-section__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@include breakpoint-down($breakpoint-mobile) {
  .projects-section__grid {
    grid-template-columns: 1fr;
  }

  .projects-section__footer {
    justify-content: stretch;
  }

  .projects-section__cta-wrap,
  .projects-section__cta {
    width: 100%;
  }

  .projects-section__cta {
    justify-content: center;
  }
}
</style>
