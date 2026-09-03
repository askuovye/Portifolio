<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { careerExperiences } from '@/data/experiences'
import CareerMemoryCards from './CareerMemoryCards.vue'
import CareerSaveData from './CareerSaveData.vue'
import CareerSkillTree from './CareerSkillTree.vue'

const selectedExperienceId = ref(careerExperiences[0]?.id ?? '')
const { t } = useI18n()
const activeExperienceId = ref(selectedExperienceId.value)
const isReadingSave = ref(false)
let readingTimer: number | undefined

const localizedExperiences = computed(() => careerExperiences.map(experience => ({
  ...experience,
  role: t(`experiences.items.${experience.id}.role`),
  period: t(`experiences.items.${experience.id}.period`),
  activities: experience.activities.map((_, index) => t(`experiences.items.${experience.id}.activities.${index}`)),
})))
const activeExperience = computed(() => localizedExperiences.value.find(item => item.id === activeExperienceId.value) ?? localizedExperiences.value[0]!)

const selectExperience = (id: string) => {
  if (id === selectedExperienceId.value && !isReadingSave.value) return
  window.clearTimeout(readingTimer)
  selectedExperienceId.value = id
  isReadingSave.value = true
  readingTimer = window.setTimeout(() => {
    activeExperienceId.value = id
    isReadingSave.value = false
  }, 340)
}

onBeforeUnmount(() => window.clearTimeout(readingTimer))
</script>

<template>
  <section class="career-system" aria-labelledby="career-system-title">
    <header class="career-system__intro">
      <div>
        <p>// {{ t('experiences.career.archive') }}</p>
        <h4 id="career-system-title">{{ t('experiences.career.dataFound') }}</h4>
      </div>
      <div class="career-system__diagnostic" :aria-label="t('experiences.career.diagnosticLabel')">
        <span>{{ t('experiences.career.systemCheck') }}: OK</span>
        <span>{{ t('experiences.career.memoryModules') }}: {{ String(careerExperiences.length).padStart(2, '0') }}</span>
        <span>{{ t('experiences.career.status') }}: <i>ONLINE</i></span>
      </div>
    </header>

    <CareerMemoryCards
      :experiences="localizedExperiences"
      :selected-id="selectedExperienceId"
      :reading="isReadingSave"
      @select="selectExperience"
    />

    <div class="career-system__digital">
      <CareerSaveData :experience="activeExperience" :reading="isReadingSave" />
      <CareerSkillTree :active-experience-id="activeExperienceId" />
    </div>

  </section>
</template>

<style scoped lang="scss">
.career-system { min-width: 0; }
.career-system__intro { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: clamp(3rem, 6vw, 5rem); }
.career-system__intro p { margin: 0 0 .8rem; color: var(--accent-bright); font-size: .68rem; letter-spacing: .1em; }
.career-system__intro h2 { max-width: 58rem; margin: 0; font-family: var(--font-display); font-size: clamp(4rem, 9vw, 8rem); line-height: .74; }
.career-system__diagnostic { display: grid; flex: none; gap: .35rem; padding: 1rem; border-left: 1px solid var(--border); color: var(--text-secondary); font-size: .6rem; letter-spacing: .08em; }
.career-system__diagnostic i { color: #4cff75; font-style: normal; }
.career-system__digital { display: grid; grid-template-columns: minmax(18rem, .72fr) minmax(35rem, 1.28fr); gap: clamp(1rem, 2vw, 2rem); margin-top: clamp(4rem, 7vw, 7rem); }

@media (max-width: 64rem) {
  .career-system__digital { grid-template-columns: 1fr; }
}

@media (max-width: 48rem) {
  .career-system__intro { align-items: start; flex-direction: column; }
  .career-system__diagnostic { width: 100%; border-top: 1px solid var(--border); border-left: 0; }
}
</style>
