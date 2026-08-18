<script setup lang="ts">
defineProps<{
  index: number
  period: string
  role: string
  company: string
  activities: string[]
  skills: string[]
  current?: boolean
}>()
</script>

<template>
  <article class="experience-card">
    <div class="experience-card__period">
      <span>{{ period }}</span>
    </div>
    <span class="experience-card__node" aria-hidden="true" />
    <div class="experience-card__window">
      <header class="experience-card__titlebar">
        <span>EXP_{{ String(index).padStart(2, '0') }}.LOG</span>
        <span aria-hidden="true">— □ ×</span>
      </header>
      <div class="experience-card__body">
        <div class="experience-card__heading">
          <div>
            <p class="experience-card__company">@ {{ company }}</p>
            <h3>{{ role }}</h3>
          </div>
          <span v-if="current" class="experience-card__status"><i /> EM CURSO</span>
        </div>
        <ul class="experience-card__activities">
      <li v-for="activity in activities" :key="activity">{{ activity }}</li>
        </ul>
        <ul class="experience-card__skills" aria-label="Competências utilizadas">
          <li v-for="skill in skills" :key="skill">[ {{ skill }} ]</li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.experience-card {
  position: relative;
  display: grid;
  grid-template-columns: 8rem 1.5rem minmax(0, 1fr);
  gap: 1rem;
  padding-bottom: clamp(2.5rem, 5vw, 4.5rem);
}

.experience-card__period {
  padding-top: .65rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: .68rem;
  line-height: 1.45;
  text-align: right;
}

.experience-card__node {
  position: relative;
  z-index: 2;
  width: .9rem;
  height: .9rem;
  margin-top: .65rem;
  border: 2px solid var(--accent-bright);
  background: var(--background);
  box-shadow: 0 0 0 4px var(--background);
  transform: rotate(45deg);
}

.experience-card__window {
  max-width: 62rem;
  border: 1px solid #777;
  background: var(--surface);
  box-shadow: 7px 8px 0 rgb(23 60 255 / 12%);
}

.experience-card__titlebar {
  display: flex;
  justify-content: space-between;
  padding: .5rem .7rem;
  background: var(--accent);
  color: white;
  font-family: var(--font-mono);
  font-size: .68rem;
  font-weight: 700;
  letter-spacing: .06em;
}

.experience-card__body { padding: clamp(1.25rem, 3vw, 2rem); }
.experience-card__heading { display: flex; justify-content: space-between; gap: 1.5rem; }
.experience-card__company { margin: 0 0 .5rem; color: var(--accent-bright); font-family: var(--font-mono); font-size: .76rem; text-transform: uppercase; }
h3 { margin: 0; font-size: clamp(1.2rem, 2.4vw, 2rem); line-height: 1.15; }
.experience-card__status { flex: none; color: #4cff75; font-family: var(--font-mono); font-size: .65rem; letter-spacing: .08em; }
.experience-card__status i { display: inline-block; width: .45rem; height: .45rem; margin-right: .35rem; background: currentColor; box-shadow: 0 0 9px currentColor; }
.experience-card__activities { display: grid; gap: .55rem; margin: 1.4rem 0; padding: 0; color: var(--text-secondary); font-size: .86rem; line-height: 1.55; list-style: none; }
.experience-card__activities li { position: relative; padding-left: 1.1rem; }
.experience-card__activities li::before { position: absolute; left: 0; color: var(--accent-bright); content: '>'; font-family: var(--font-mono); }
.experience-card__skills { display: flex; flex-wrap: wrap; gap: .45rem; margin: 0; padding: 0; list-style: none; }
.experience-card__skills li { color: var(--text-secondary); font-family: var(--font-mono); font-size: .65rem; text-transform: uppercase; }

@media (max-width: 48rem) {
  .experience-card { grid-template-columns: 1rem minmax(0, 1fr); gap: .8rem; padding-left: 0; }
  .experience-card__period { grid-column: 2; padding: 0; text-align: left; }
  .experience-card__node { position: absolute; left: 0; top: .05rem; width: .8rem; height: .8rem; margin: 0; }
  .experience-card__window { grid-column: 2; }
  .experience-card__heading { flex-direction: column-reverse; gap: .75rem; }
}
</style>
