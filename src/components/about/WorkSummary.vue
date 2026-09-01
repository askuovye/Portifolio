<script setup lang="ts">
import { ref } from 'vue'
import RetroWindow from '@/components/ui/RetroWindow.vue'
import TypedText from '@/components/ui/TypedText.vue'

const section = ref<HTMLElement | null>(null)

defineExpose({
  getRevealElement: () => section.value ?? undefined,
})
</script>

<template>
  <section ref="section" aria-labelledby="work-summary-title">
    <RetroWindow class="work-summary" title="work_summary.sh" close-label="Janela decorativa sobre meu trabalho">
      <div class="terminal">
        <div class="terminal__toolbar" aria-hidden="true">
          <span>TERMINAL_01</span>
          <span>UTF-8 · BASH</span>
        </div>
        <p class="terminal__command"><span>joao@dev:~$</span> <TypedText text="whoami --work" :delay="100" :speed="32" /></p>
        <TypedText id="work-summary-title" class="terminal__title" tag="h2" text="O que eu faço exatamente?" :delay="600" :speed="24" />
        <div class="terminal__output">
          <p><span>01</span><TypedText text="Freelancer full stack e projetos pessoais que estimulam minha criatividade." :delay="1250" :speed="14" /></p>
          <p><span>02</span><TypedText text="Graduando em Engenharia de Software e evoluindo para oportunidades remotas internacionais." :delay="2200" :speed="12" /></p>
        </div>
        <p class="terminal__cursor" aria-hidden="true"><TypedText text="joao@dev:~$" :delay="3350" :speed="26" /> <i>_</i></p>
      </div>
    </RetroWindow>
  </section>
</template>

<style scoped lang="scss">
.terminal { min-height: clamp(23rem, 32vw, 30rem); padding: clamp(1.25rem, 3vw, 2.25rem); background: #050505; font-family: var(--font-mono); }
.terminal__toolbar { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: clamp(2.5rem, 5vw, 4.5rem); padding-bottom: .65rem; border-bottom: 1px dashed var(--border); color: #666; font-size: .58rem; letter-spacing: .08em; }
.terminal__command { margin: 0 0 1rem; color: var(--text-secondary); font-size: .7rem; }
.terminal__command span, .terminal__cursor { color: var(--accent-bright); }
.terminal__title { max-width: 32rem; margin: 0; font-size: clamp(1.6rem, 3.2vw, 2.8rem); line-height: 1.1; text-transform: uppercase; }
.terminal__output { display: grid; gap: 1rem; margin-top: 2rem; color: var(--text-secondary); font-size: clamp(.72rem, 1vw, .84rem); line-height: 1.7; }
.terminal__output p { display: grid; grid-template-columns: 1.5rem 1fr; gap: .65rem; margin: 0; }
.terminal__output span { color: #666; }
.terminal__cursor { margin: 2rem 0 0; font-size: .68rem; }
.terminal__cursor i { animation: blink 850ms steps(1) infinite; font-style: normal; }
@keyframes blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .terminal__cursor i { animation: none; } }
</style>
