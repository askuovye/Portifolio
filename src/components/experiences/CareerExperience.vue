<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { careerExperiences } from '@/data/experiences'
import CareerMemoryCards from './CareerMemoryCards.vue'
import CareerSaveData from './CareerSaveData.vue'
import CareerSkillTree from './CareerSkillTree.vue'

const selectedExperienceId = ref(careerExperiences[0]?.id ?? '')
const activeExperienceId = ref(selectedExperienceId.value)
const isReadingSave = ref(false)
let readingTimer: number | undefined

const activeExperience = computed(() => careerExperiences.find(item => item.id === activeExperienceId.value) ?? careerExperiences[0]!)

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
        <p>// EXPERIENCE ARCHIVE</p>
        <h4 id="career-system-title">Career data found.</h4>
      </div>
      <div class="career-system__diagnostic" aria-label="Diagnóstico do sistema">
        <span>SYSTEM CHECK: OK</span>
        <span>MEMORY MODULES: {{ String(careerExperiences.length).padStart(2, '0') }}</span>
        <span>STATUS: <i>ONLINE</i></span>
      </div>
    </header>

    <CareerMemoryCards
      :experiences="careerExperiences"
      :selected-id="selectedExperienceId"
      :reading="isReadingSave"
      @select="selectExperience"
    />

    <div class="career-system__digital">
      <CareerSaveData :experience="activeExperience" :reading="isReadingSave" />
      <CareerSkillTree :active-experience-id="activeExperienceId" />
    </div>

    <footer class="career-progress">
      <div class="career-progress__copy">
        <span>&gt; SAVE STATUS: <strong>ACTIVE</strong></span>
        <span>&gt; CAREER.EXE: <strong>RUNNING</strong></span>
        <span>&gt; THIS SAVE IS STILL BEING WRITTEN.</span>
      </div>
      <div class="career-progress__bar" aria-label="Progressão conceitual da carreira">
        <span>PROGRESS</span>
        <i v-for="index in 28" :key="index" :class="{ 'is-filled': index <= 21 }" />
      </div>
      <small>DO NOT TURN OFF YOUR SYSTEM</small>
    </footer>
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
.career-progress { display: grid; gap: 1.5rem; margin-top: clamp(2rem, 4vw, 4rem); padding: clamp(1.25rem, 3vw, 2rem); border: 1px solid var(--border); background: linear-gradient(90deg, rgb(23 60 255 / 8%), transparent 45%), #050505; }
.career-progress__copy { display: grid; gap: .5rem; color: var(--text-secondary); font-size: clamp(.68rem, 1.2vw, .88rem); }
.career-progress__copy strong { color: var(--accent-bright); }
.career-progress__bar { display: flex; align-items: center; gap: .28rem; color: var(--text-secondary); font-size: .6rem; }
.career-progress__bar span { margin-right: .5rem; }
.career-progress__bar i { width: min(1.1rem, 2vw); height: .75rem; border: 1px solid #333; background: #0b0b0b; }
.career-progress__bar i.is-filled { border-color: #5972ff; background: var(--accent); box-shadow: inset 1px 1px rgb(255 255 255 / 25%); }
.career-progress small { padding-top: .75rem; border-top: 1px solid #292929; color: #5e5e5e; font-size: .52rem; letter-spacing: .08em; }

@media (max-width: 64rem) {
  .career-system__digital { grid-template-columns: 1fr; }
}

@media (max-width: 48rem) {
  .career-system__intro { align-items: start; flex-direction: column; }
  .career-system__diagnostic { width: 100%; border-top: 1px solid var(--border); border-left: 0; }
  .career-progress__bar { overflow: hidden; }
  .career-progress__bar i:nth-of-type(n + 19) { display: none; }
}
</style>
