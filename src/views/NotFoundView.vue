<script setup lang="ts">
import RetroButton from '@/components/ui/RetroButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="not-found" aria-labelledby="not-found-title">
    <div class="not-found__panel">
      <div class="not-found__status" aria-hidden="true">
        <span>ERROR_CODE: 404</span>
        <span>{{ t('notFound.systemStatus') }}</span>
      </div>

      <p class="not-found__code">404</p>
      <div class="not-found__content">
        <p class="not-found__path">&gt; PATH_NOT_FOUND_</p>
        <h1 id="not-found-title">{{ t('notFound.title') }}</h1>
        <p class="not-found__description">
          {{ t('notFound.descriptionFirst') }}<br>
          {{ t('notFound.descriptionSecond') }}
        </p>
        <RetroButton to="/" variant="primary" arrow>{{ t('notFound.backHome') }}</RetroButton>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.not-found {
  display: grid;
  min-height: calc(100dvh - 13rem);
  place-items: center;
  padding: clamp(2rem, 6vw, 6rem) clamp(1rem, 4vw, 4rem);
  border-block: 1px solid var(--border);
}

.not-found__panel {
  position: relative;
  display: grid;
  grid-template-columns: minmax(15rem, .7fr) minmax(0, 1.3fr);
  width: min(100%, 68rem);
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--border);
  background:
    linear-gradient(rgb(255 255 255 / 2%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 2%) 1px, transparent 1px),
    var(--background);
  background-size: 2rem 2rem;
}

.not-found__panel::after {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 35%;
  height: 1px;
  background: var(--accent-bright);
  box-shadow: 0 -4px 18px rgb(49 87 255 / 48%);
  content: '';
}

.not-found__status {
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: .7rem 1rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: .58rem;
  letter-spacing: .1em;
}

.not-found__status span:first-child { color: var(--accent-bright); }

.not-found__code {
  display: grid;
  min-width: 0;
  margin: 0;
  place-items: center;
  padding: 4.5rem clamp(1.5rem, 4vw, 3rem) 3rem;
  border-right: 1px solid var(--border);
  color: var(--accent-bright);
  font-family: var(--font-display);
  font-size: clamp(8rem, 18vw, 15rem);
  line-height: .7;
}

.not-found__content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  padding: clamp(5rem, 8vw, 7rem) clamp(2rem, 6vw, 5rem) clamp(3rem, 6vw, 5rem);
}

.not-found__path {
  margin: 0 0 1.25rem;
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: .68rem;
  letter-spacing: .1em;
}

.not-found h1 {
  margin: 0;
  color: var(--text-primary);
  font-family: var(--font-display);
  font-size: clamp(3rem, 5vw, 4.5rem);
  font-weight: 400;
  line-height: .88;
  text-transform: uppercase;
}

.not-found__description {
  margin: 1.75rem 0 2rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: clamp(.82rem, 1.3vw, 1rem);
  line-height: 1.7;
}

@media (max-width: 48rem) {
  .not-found { min-height: calc(100dvh - 11rem); padding-inline: 0; }
  .not-found__panel { grid-template-columns: 1fr; }
  .not-found__code {
    justify-content: start;
    padding: 5rem 1.5rem 2rem;
    border-right: 0;
    border-bottom: 1px solid var(--border);
    font-size: clamp(7rem, 38vw, 10rem);
  }
  .not-found__content { padding: 2.5rem 1.5rem 3rem; }
  .not-found h1 { max-width: 9ch; font-size: clamp(2.25rem, 10.5vw, 4.5rem); }
  .not-found__description br { display: none; }
}

@media (max-width: 24rem) {
  .not-found__status { font-size: .5rem; }
  .not-found__content { padding-inline: 1rem; }
}
</style>
