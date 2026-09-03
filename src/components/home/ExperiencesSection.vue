<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import RetroButton from '@/components/ui/RetroButton.vue'
import RetroWindow from '@/components/ui/RetroWindow.vue'
import ScrollVideo from '@/components/ui/ScrollVideo.vue'
import nokiaVideo from '@/assets/animations/nokia.mp4'
import { gsap } from '@/animations/gsap'
import { useGsapContext } from '@/composables/useGsapContext'
import { careerSkillNodes } from '@/data/careerSkills'
import { careerExperiences } from '@/data/experiences'

interface ExperienceSummary {
  id: string
  period: string
  role: string
  company: string
  description: string
  technologies: string[]
  current?: boolean
}

const featuredExperienceIds = new Set([
  'bp-tech',
  'aurora-digital',
  'nexora-systems',
  'costa-crociere',
])

const skillLabels = new Map(careerSkillNodes.map(skill => [skill.id, skill.label]))
const { t } = useI18n()

const experiences = computed<ExperienceSummary[]>(() => careerExperiences
  .filter(experience => featuredExperienceIds.has(experience.id))
  .map(experience => ({
    id: experience.id,
    period: t(`home.experience.items.${experience.id}.period`),
    role: t(`home.experience.items.${experience.id}.role`),
    company: experience.company,
    description: t(`home.experience.items.${experience.id}.description`),
    technologies: experience.skills.map(skill => skillLabels.get(skill) ?? skill),
    current: experience.status === 'active',
  })))

const section = ref<HTMLElement | null>(null)

useGsapContext(section, ({ reducedMotion }) => {
  const heading = section.value?.querySelector('.experiences__heading')
  const line = section.value?.querySelector('.timeline__progress')
  const cards = section.value?.querySelectorAll('.experience')

  if (!heading || !line || !cards?.length) return

  if (reducedMotion) {
    gsap.set([heading, line, ...cards], { clearProps: 'opacity,transform' })
    return
  }

  gsap.from(heading, {
    y: 20,
    opacity: 0,
    duration: 0.5,
    ease: 'power3.out',
    scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
  })

  gsap.fromTo(line, { scaleY: 0 }, {
    scaleY: 1,
    transformOrigin: 'top center',
    ease: 'none',
    scrollTrigger: {
      trigger: section.value,
      start: 'top 65%',
      end: 'bottom 78%',
      scrub: 0.6,
    },
  })

  cards.forEach((card, index) => {
    const window = card.querySelector('.experience__window')
    const node = card.querySelector('.experience__node')
    if (!window || !node) return

    gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 86%',
        end: 'bottom 14%',
        toggleActions: 'play reverse play reverse',
      },
    })
      .from(node, {
        scale: 0,
        opacity: 0,
        duration: 0.32,
        ease: 'back.out(2.5)',
      })
      .fromTo(window, {
        x: index % 2 === 0 ? -32 : 32,
        y: 24,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
      }, '-=0.04')
      .from(window, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.8,
        ease: 'power3.inOut',
        clearProps: 'clipPath',
      }, '<0.08')
  })
})
</script>

<template>
  <section ref="section" class="experiences" aria-labelledby="experiences-title">
    <aside class="experiences__video-track" :aria-label="t('home.experience.nokiaAnimationLabel')">
      <ScrollVideo
        id="home-nokia"
        class="experiences__video-frame decorative-video-edge-fade"
        :src="nokiaVideo"
        :priority="10"
        trigger-selector=".experiences"
        start="top top+=88"
        end="bottom bottom-=48"
      />
    </aside>

    <div class="experiences__heading">
      <div>
        <p class="experiences__eyebrow">{{ t('home.experience.eyebrow') }}</p>
        <SectionTitle id="experiences-title" :level="2">{{ t('home.experience.title') }}</SectionTitle>
      </div>
      <p class="experiences__intro">{{ t('home.experience.intro') }}</p>
    </div>

    <div class="timeline">
      <span class="timeline__rail" aria-hidden="true">
        <span class="timeline__progress" />
      </span>

      <article
        v-for="(experience, index) in experiences"
        :key="experience.id"
        class="experience"
        :class="{ 'experience--right': index % 2 !== 0 }"
      >
        <span class="experience__node" aria-hidden="true">
          <span>{{ String(index + 1).padStart(2, '0') }}</span>
        </span>

        <RetroWindow
          class="experience__window"
          :title="`EXP_${String(index + 1).padStart(2, '0')}.EXE`"
          :close-label="t('home.experience.windowLabel', { role: experience.role })"
        >
          <div class="experience__body">
            <div class="experience__meta">
              <span>{{ experience.period }}</span>
              <span v-if="experience.current" class="experience__status"><i /> {{ t('home.experience.current') }}</span>
            </div>
            <h3>{{ experience.role }}</h3>
            <p class="experience__company">@ {{ experience.company }}</p>
            <p class="experience__description">{{ experience.description }}</p>
            <ul class="experience__tags" :aria-label="t('home.experience.skillsLabel')">
              <li v-for="technology in experience.technologies" :key="technology">[ {{ technology }} ]</li>
            </ul>
          </div>
        </RetroWindow>
      </article>
    </div>

    <div class="experiences__footer">
      <span aria-hidden="true">{{ String(experiences.length).padStart(2, '0') }} {{ t('home.experience.recordsFound') }}</span>
      <RetroButton to="/experiences" arrow>{{ t('home.experience.viewAll') }}</RetroButton>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.experiences {
  position: relative;
  padding: var(--section-space) clamp(.75rem, 4vw, 4rem);
  overflow: visible;
  border-top: 0;
  background:
    linear-gradient(rgb(255 255 255 / 2%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 2%) 1px, transparent 1px),
    var(--background);
  background-size: 32px 32px;
}

.experiences::before {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: #666;
  font-family: var(--font-mono);
  font-size: .62rem;
  letter-spacing: .12em;
}

.experiences__video-track {
  position: absolute;
  z-index: 0;
  inset: 0;
  pointer-events: none;
}

.experiences__video-frame {
  --video-fade-left: 22%;
  --video-fade-right: 4%;
  --video-fade-top: 8%;
  --video-fade-bottom: 5%;

  position: sticky;
  top: clamp(5rem, 9vh, 7rem);
  width: clamp(40rem, 13vw, 12rem);
  height: clamp(41rem, 18vw, 17rem);
  margin-left: auto;
  transform: translateX(60%) rotate(-12deg);
}

.experiences__heading,
.timeline,
.experiences__footer {
  position: relative;
  z-index: 1;
}

.experiences__heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(16rem, 28rem);
  gap: 2rem;
  align-items: end;
  max-width: 75rem;
  margin: 0 auto clamp(3rem, 7vw, 6rem);
}

.experiences__eyebrow {
  margin-bottom: .7rem;
  color: var(--accent-bright);
  font-size: .68rem;
  letter-spacing: .12em;
}

.experiences__intro {
  padding-left: 1rem;
  border-left: 2px solid var(--accent);
  font-size: clamp(.78rem, 1.15vw, .92rem);
  line-height: 1.65;
}

.timeline {
  position: relative;
  display: grid;
  gap: clamp(2.5rem, 5vw, 4.5rem);
  max-width: 68rem;
  margin-inline: auto;
}

.timeline__rail {
  position: absolute;
  top: 1.2rem;
  bottom: 1.2rem;
  left: 50%;
  width: 1px;
  background: #3d3d3d;
  transform: translateX(-50%);
}

.timeline__progress {
  display: block;
  width: 100%;
  height: 100%;
  background: var(--accent-bright);
  box-shadow: 0 0 12px rgb(49 87 255 / 55%);
}

.experience {
  position: relative;
  width: calc(50% - 2.75rem);
}

.experience::after {
  position: absolute;
  z-index: 1;
  top: 1.95rem;
  right: -2.75rem;
  width: 2.75rem;
  height: 1px;
  background: linear-gradient(90deg, #777, var(--accent-bright));
  content: '';
}

.experience--right {
  justify-self: end;
}

.experience--right::after {
  right: auto;
  left: -2.75rem;
  background: linear-gradient(90deg, var(--accent-bright), #777);
}

.experience__node {
  position: absolute;
  z-index: 2;
  top: 1rem;
  right: -3.75rem;
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid var(--accent-bright);
  background: var(--background);
  color: var(--accent-bright);
  font-size: .58rem;
  transform: rotate(45deg);
}

.experience__node span { transform: rotate(-45deg); }
.experience--right .experience__node { right: auto; left: -3.75rem; }

.experience__window {
  box-shadow: 7px 8px 0 rgb(23 60 255 / 18%);
  transition: border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}

.experience:hover .experience__window {
  border-color: var(--text-primary);
  box-shadow: 10px 11px 0 rgb(23 60 255 / 27%);
  transform: translate(-2px, -2px);
}

.experience__body { padding: clamp(1rem, 2.2vw, 1.5rem); }

.experience__meta {
  display: flex;
  justify-content: space-between;
  gap: .75rem;
  margin-bottom: 1.2rem;
  padding-bottom: .65rem;
  border-bottom: 1px dashed #484848;
  color: var(--text-secondary);
  font-size: .64rem;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.experience__status { color: #9caeff; white-space: nowrap; }
.experience__status i { display: inline-block; width: .42rem; height: .42rem; margin-right: .25rem; border-radius: 50%; background: var(--accent-bright); box-shadow: 0 0 8px var(--accent-bright); }

.experience h3 {
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: clamp(1rem, 1.7vw, 1.3rem);
  font-weight: 700;
  line-height: 1.25;
  text-transform: uppercase;
}

.experience__company { margin-top: .25rem; color: var(--accent-bright); font-size: .75rem; text-transform: uppercase; }
.experience__description { margin-top: 1rem; font-size: .78rem; line-height: 1.6; }

.experience__tags {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
  margin: 1.2rem 0 0;
  padding: 0;
  list-style: none;
}

.experience__tags li { color: #ddd; font-size: .6rem; text-transform: uppercase; }

.experiences__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  max-width: 68rem;
  margin: clamp(3rem, 6vw, 5rem) auto 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--border);
  color: #666;
  font-size: .62rem;
  letter-spacing: .1em;
}

@include breakpoint-down($breakpoint-tablet) {
  .experiences__heading { grid-template-columns: 1fr; align-items: start; }
  .experiences__video-frame {
    transform: translateX(47%) rotate(-12deg);
  }
}

@include breakpoint-down($breakpoint-mobile) {
  .experiences { padding-inline: .75rem; }
  .experiences::before { display: none; }
  .experiences__video-track { display: none; }
  .experiences__heading { margin-bottom: 3rem; }
  .timeline { gap: 2.25rem; padding-left: 2.8rem; }
  .timeline__rail { left: 1rem; }
  .experience, .experience--right { width: 100%; justify-self: stretch; }
  .experience::after, .experience--right::after {
    top: 1.75rem;
    right: auto;
    left: -1.8rem;
    width: 1.8rem;
    background: linear-gradient(90deg, var(--accent-bright), #777);
  }
  .experience__node, .experience--right .experience__node { top: .8rem; right: auto; left: -2.8rem; }
  .experience__meta { align-items: flex-start; flex-direction: column; }
  .experiences__footer { align-items: stretch; flex-direction: column; }
  .experiences__footer > span { display: none; }
}
</style>
