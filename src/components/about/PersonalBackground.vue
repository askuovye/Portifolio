<script setup lang="ts">
import { ref } from 'vue'
import RetroWindow from '@/components/ui/RetroWindow.vue'
import TypedText from '@/components/ui/TypedText.vue'
import { useI18n } from 'vue-i18n'

const section = ref<HTMLElement | null>(null)
const { t } = useI18n()

defineExpose({
  getRevealElement: () => section.value ?? undefined,
})
</script>

<template>
  <section ref="section" aria-labelledby="personal-background-title">
    <RetroWindow class="personal-background" title="background.log" :close-label="t('about.background.windowLabel')">
      <div class="terminal">
        <div class="terminal__toolbar" aria-hidden="true">
          <span>TERMINAL_02</span>
          <span>LOG · READ ONLY</span>
        </div>
        <p class="terminal__command"><span>joao@dev:~$</span> <TypedText text="cat life_before_code.txt" :delay="100" :speed="29" /></p>
        <TypedText id="personal-background-title" class="terminal__title" tag="h2" :text="t('about.background.title')" :delay="750" :speed="27" />
        <div class="terminal__output">
          <p><span>&gt;</span><TypedText :text="t('about.background.internationalWork')" :delay="1250" :speed="13" /></p>
          <p><span>&gt;</span><TypedText :text="t('about.background.lessons')" :delay="2300" :speed="11" /></p>
        </div>
        <p class="terminal__status"><i aria-hidden="true" /><TypedText :text="t('about.background.loaded')" :delay="3650" :speed="21" /></p>
      </div>
    </RetroWindow>
  </section>
</template>

<style scoped lang="scss">
.terminal { min-height: clamp(23rem, 32vw, 30rem); padding: clamp(1.25rem, 3vw, 2.25rem); background: #050505; font-family: var(--font-mono); }
.terminal__toolbar { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: clamp(2.5rem, 5vw, 4.5rem); padding-bottom: .65rem; border-bottom: 1px dashed var(--border); color: #666; font-size: .58rem; letter-spacing: .08em; }
.terminal__command { margin: 0 0 1rem; color: var(--text-secondary); font-size: .7rem; }
.terminal__command span { color: var(--accent-bright); }
.terminal__title { max-width: 30rem; margin: 0; font-size: clamp(1.6rem, 3.2vw, 2.8rem); line-height: 1.1; text-transform: uppercase; }
.terminal__output { display: grid; gap: 1rem; margin-top: 2rem; color: var(--text-secondary); font-size: clamp(.72rem, 1vw, .84rem); line-height: 1.7; }
.terminal__output p { display: grid; grid-template-columns: 1rem 1fr; gap: .65rem; margin: 0; }
.terminal__output span { color: var(--accent-bright); }
.terminal__status { display: flex; align-items: center; gap: .5rem; margin: 2rem 0 0; color: #4cff75; font-size: .62rem; letter-spacing: .06em; }
.terminal__status i { width: .45rem; height: .45rem; background: currentColor; box-shadow: 0 0 8px currentColor; }
</style>
