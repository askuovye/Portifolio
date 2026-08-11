<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { motion, useReducedMotion } from 'motion-v'
import RetroButton from '@/components/ui/RetroButton.vue'
import RetroWindow from '@/components/ui/RetroWindow.vue'
import profileImage from '@/assets/profile-joao.jpeg'

const prefersReducedMotion = useReducedMotion()
const enter = (delay: number, extra: Record<string, number | string> = {}) => ({
  initial: prefersReducedMotion.value ? { opacity: 0 } : { opacity: 0, y: 16, ...extra },
  animate: { opacity: 1, y: 0, clipPath: 'none', scale: 1, rotate: 0 },
  transition: { duration: prefersReducedMotion.value ? 0.01 : 0.42, delay: prefersReducedMotion.value ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
})
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <span class="hero__accessible-name">Opa! João aqui.</span>
    <div class="hero__content">
      <motion.p class="hero__hello" v-bind="enter(0.05)">Opa!</motion.p>
      <motion.h1 id="hero-title" class="hero__title" v-bind="enter(0.38)">
        João aqui.<span class="hero__wave" aria-hidden="true">👋</span>
      </motion.h1>
      <motion.p class="hero__role" v-bind="enter(0.24)">ENGENHEIRO DE SOFTWARE<br><span>— BRASIL 🇧🇷 —</span></motion.p>
      <motion.p class="hero__description" v-bind="enter(0.32)">Eu crio sites dinâmicos, estéticos<br class="desktop-only"> e altamente funcionais.</motion.p>
      <motion.div class="hero__actions" v-bind="enter(0.4)">
        <RetroButton to="/projects" variant="primary" arrow>Ver projetos</RetroButton>
        <RetroButton to="/contact" variant="secondary" mail>Entre em contato</RetroButton>
      </motion.div>
    </div>

    <motion.div class="hero__portrait" v-bind="enter(0.48)">
      <RetroWindow title="joao.dev - profile.exe" class="profile-window">
        <div class="portrait-frame">
          <img :src="profileImage" alt="Retrato em preto e branco de João" width="1024" height="1365">
          <div class="portrait-frame__halftone" aria-hidden="true" />
        </div>
      </RetroWindow>
    </motion.div>
    <motion.aside class="dev-card deco" aria-label="Modo de desenvolvimento" v-bind="enter(0.72)">
      <div class="dev-card__icons">▣ ◈ ◉ ⚒</div><strong>DEV MODE</strong><span>100% &nbsp; 006&gt; &nbsp; 100c</span><small>CODE / BUILD / CREATE</small>
    </motion.aside>
    <motion.aside class="coordinates deco" aria-label="Localização" v-bind="enter(0.78)">
      <span class="coordinates__globe">⌁</span><span>−23.5505° S<br>−46.6333° W</span><strong>BRASIL</strong>
    </motion.aside>
    <motion.div class="vertical-note deco" v-bind="enter(0.82)">DESIGN + CODE + CREATE</motion.div>
    <motion.div class="barcode deco" aria-hidden="true" v-bind="enter(0.86)"><span /><small>ONE OF A KIND</small></motion.div>
    <motion.div class="disposable deco" v-bind="enter(0.9)"><Icon class="disposable__icon" icon="mdi:recycle" aria-hidden="true" /><span>NON-DISPOSABLE</span></motion.div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.hero { position: relative; min-height: clamp(40rem, 69vw, 51rem); padding: clamp(2.2rem, 6vw, 5.2rem) clamp(1rem, 8vw, 8.5rem) 7rem; overflow: hidden; border-bottom: 1px solid var(--border); }
.hero__accessible-name { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hero__content { position: relative; z-index: 4; width: min(55%, 47rem); margin-left: clamp(1rem, 5vw, 4.5rem); }
.hero__hello { margin: 0 0 .05rem; color: white; font-family: var(--font-display); font-size: clamp(3rem, 6.2vw, 6.1rem); line-height: 1; text-transform: uppercase; }
.hero__title { position: relative; width: max-content; margin: 0; color: var(--accent); font-size: clamp(3.6rem, 7.8vw, 8rem); line-height: 1.1; white-space: nowrap; }
.hero__wave { display: inline-block; margin-left: .25em; font-family: sans-serif; font-size: .37em; vertical-align: .35em; filter: grayscale(1) sepia(1) saturate(12) hue-rotate(190deg); }
.hero__role { margin: 1.5rem 0 .8rem; color: var(--text-primary); font-size: clamp(1rem, 2vw, 1.7rem); line-height: 1.15; letter-spacing: .02em; }
.hero__description { margin: 0; font-size: clamp(.85rem, 1.2vw, 1rem); line-height: 1.55; }
.hero__actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.35rem; }
.hero__portrait { position: absolute; z-index: 2; top: clamp(3rem, 5vw, 5rem); right: clamp(5.5rem, 9vw, 9rem); width: clamp(19rem, 32vw, 31rem); transform: rotate(-3deg); transform-origin: center center; }
.portrait-frame { height: clamp(24rem, 39vw, 38rem); background: #111; }
.portrait-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center 18%; filter: grayscale(1) contrast(1.45) brightness(.9); }
.portrait-frame__halftone { position: absolute; inset: 0; opacity: .17; background: radial-gradient(circle, #fff 0 1px, transparent 1.2px); background-size: 4px 4px; mix-blend-mode: overlay; pointer-events: none; }
.profile-window { transform: rotate(-3deg); transform-origin: center center;; }
.hero__badge { position: absolute; z-index: 5; right: clamp(3rem, 6vw, 6rem); bottom: 6.5rem; display: flex; align-items: center; flex-direction: column; width: clamp(11rem, 17vw, 16rem); padding: 1.8rem 1rem; border: 1px solid #aaa; background: #080808; clip-path: polygon(7% 5%, 88% 0, 100% 18%, 94% 88%, 81% 100%, 9% 94%, 0 77%, 3% 16%); color: white; font-size: clamp(1rem, 1.8vw, 1.55rem); line-height: 1.05; transform: rotate(4deg); }
.hero__badge i { margin-top: .6rem; color: var(--accent-bright); font-size: 2rem; font-style: normal; }
.deco { position: absolute; z-index: 3; color: var(--text-secondary); font-size: .68rem; }
.dev-card { top: 2rem; left: 0; display: grid; width: 8rem; padding: .7rem; border: 1px solid var(--border); gap: .25rem; }
.dev-card__icons { padding-bottom: .5rem; border-bottom: 1px solid var(--border); color: white; }
.dev-card strong { color: white; font-size: 1rem; font-weight: 400; }
.dev-card small { color: var(--accent-bright); font-size: .55rem; }
.coordinates { top: 1rem; right: 0; display: flex; align-items: center; flex-direction: column; text-align: center; }
.coordinates__globe { display: grid; width: 3.4rem; height: 3.4rem; margin-bottom: .5rem; place-items: center; border: 1px solid white; border-radius: 50%; color: white; font-size: 2.5rem; }
.coordinates strong { margin-top: .25rem; color: white; font-weight: 400; }
.vertical-note { right: .4rem; bottom: 15rem; writing-mode: vertical-rl; color: white; letter-spacing: .12em; }
.barcode { bottom: 3.5rem; left: 1.4rem; display: grid; gap: .4rem; }
.barcode span { width: 5rem; height: 4.8rem; background: repeating-linear-gradient(90deg, white 0 2px, transparent 2px 4px, white 4px 5px, transparent 5px 8px); }
.disposable { right: .4rem; bottom: 5rem; display: flex; align-items: center; flex-direction: column; gap: .15rem; color: white; writing-mode: vertical-rl; }
.disposable__icon { width: 1.7rem; height: 1.7rem; color: var(--accent-bright); }

@include breakpoint-down($breakpoint-tablet) {
  .hero { min-height: auto; padding: 3rem 1rem 6rem; }
  .hero__content { width: 62%; margin-left: 0; }
  .hero__portrait { top: 4.5rem; right: 1rem; width: 40%; }
  .portrait-frame { height: 31rem; }
  .dev-card, .coordinates, .vertical-note, .disposable { display: none; }
  .hero__badge { right: 1rem; bottom: 4rem; }
}

@include breakpoint-down($breakpoint-mobile) {
  .hero { display: flex; flex-direction: column; gap: 2rem; padding: 2.5rem 0 5rem; overflow: hidden; }
  .hero__content { width: 100%; }
  .hero__hello { font-size: clamp(3.5rem, 20vw, 5rem); }
  .hero__title { font-size: clamp(4rem, 22vw, 6rem); white-space: normal; }
  .hero__role { margin-top: 1.1rem; }
  .hero__portrait { position: relative; top: auto; right: auto; width: calc(100% - 2rem); margin-left: 1rem; }
  .portrait-frame { height: min(118vw, 34rem); }
  .hero__badge { right: .35rem; bottom: 4rem; width: 11rem; }
  .barcode { display: none; }
  .desktop-only { display: none; }
}
</style>
