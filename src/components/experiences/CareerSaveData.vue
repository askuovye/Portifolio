<script setup lang="ts">
import type { CareerExperience } from '@/data/experiences'

defineProps<{
  experience: CareerExperience
  reading: boolean
}>()
</script>

<template>
  <section class="save-data" :class="{ 'save-data--reading': reading }" aria-labelledby="save-data-title" aria-live="polite">
    <header class="save-data__bar">
      <span id="save-data-title">// CAREER SAVE DATA</span>
      <span>{{ reading ? 'READING...' : experience.saveFile }}</span>
    </header>
    <div v-if="reading" class="save-data__reading">
      <span>READING CAREER DATA</span><i aria-hidden="true" />
    </div>
    <div v-else class="save-data__body">
      <dl class="save-data__facts">
        <div><dt>ROLE</dt><dd>{{ experience.role }}</dd></div>
        <div><dt>PERIOD</dt><dd>{{ experience.period }}</dd></div>
        <div><dt>STATUS</dt><dd :class="{ 'is-active': experience.status === 'active' }">{{ experience.status.toUpperCase() }}</dd></div>
      </dl>
      <div class="save-data__description">
        <span>DESCRIPTION.LOG</span>
        <ul>
          <li v-for="activity in experience.activities" :key="activity">{{ activity }}</li>
        </ul>
      </div>
      <footer>
        <span>SKILLS ACQUIRED</span>
        <strong>{{ String(experience.skills.length).padStart(2, '0') }}</strong>
      </footer>
    </div>
  </section>
</template>

<style scoped lang="scss">
.save-data { min-height: 31rem; border: 1px solid #777; background: #050605; box-shadow: 7px 8px 0 rgb(23 60 255 / 15%); }
.save-data__bar { display: flex; justify-content: space-between; gap: 1rem; padding: .55rem .75rem; background: var(--accent); color: white; font-size: .8rem; font-weight: 700; letter-spacing: .08em; }
.save-data__body { padding: clamp(1.2rem, 3vw, 2rem); animation: save-data-in .36s steps(4); }
.save-data__facts { display: grid; gap: .75rem; margin: 0; }
.save-data__facts div { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr); gap: 1rem; padding-bottom: .7rem; border-bottom: 1px solid #292929; }
.save-data dt { color: #747474; font-size: .78rem; letter-spacing: .1em; }
.save-data dd { margin: 0; color: var(--text-primary); font-size: .94rem; text-align: right; }
.save-data dd.is-active { color: #4cff75; }
.save-data__description { margin-top: 1.5rem; }
.save-data__description > span { color: var(--accent-bright); font-size: .78rem; letter-spacing: .1em; }
.save-data__description ul { display: grid; gap: .7rem; margin: 1rem 0; padding: 0; color: var(--text-secondary); font-size: .9rem; line-height: 1.55; list-style: none; }
.save-data__description li { position: relative; padding-left: 1rem; }
.save-data__description li::before { position: absolute; left: 0; color: var(--accent-bright); content: '>'; }
.save-data footer { display: flex; align-items: center; justify-content: space-between; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border); color: var(--text-secondary); font-size: .81rem; }
.save-data footer strong { color: var(--accent-bright); font-size: 1.5rem; }
.save-data__reading { display: grid; min-height: 27rem; place-content: center; gap: 1rem; color: var(--accent-bright); font-size: .88rem; letter-spacing: .12em; text-align: center; }
.save-data__reading i { display: block; width: 12rem; height: .35rem; border: 1px solid #303030; background: linear-gradient(90deg, var(--accent) 0 65%, #141414 65%); animation: reading-bar .32s steps(4) infinite; }

@keyframes save-data-in { from { opacity: .15; transform: translateY(.4rem); } }
@keyframes reading-bar { 50% { filter: brightness(1.7); } }

@media (prefers-reduced-motion: reduce) {
  .save-data__body, .save-data__reading i { animation: none; }
}
</style>
