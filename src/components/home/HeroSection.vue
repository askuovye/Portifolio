<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { motion, useReducedMotion } from 'motion-v'
import RetroButton from '@/components/ui/RetroButton.vue'
import RetroWindow from '@/components/ui/RetroWindow.vue'
import profileImage from '@/assets/profile-joao.jpeg'
import cursorImage from '@/assets/elements/cursor.png'
import devmodeBadge from '@/assets/elements/devmode-badge.png'
import barCode from '@/assets/elements/barcode.png'
import heroBadge from '@/assets/elements/hero-badge.png'
import paperImage from '@/assets/elements/paper.png'
import chainsVideo from '@/assets/animations/chains.mp4'
import { gsap } from '@/animations/gsap'
import { useGsapContext } from '@/composables/useGsapContext'

const prefersReducedMotion = useReducedMotion()
const hero = ref<HTMLElement | null>(null)
const profileWindow = ref<HTMLElement | null>(null)
const profileImageReveal = ref<HTMLElement | null>(null)
const chains = ref<HTMLElement | null>(null)
const chainsPlayer = ref<HTMLVideoElement | null>(null)
const isDesktop = ref(false)
let chainsObserver: IntersectionObserver | undefined
let desktopMedia: MediaQueryList | undefined

useGsapContext(hero, ({ reducedMotion }) => {
  if (!profileWindow.value || !profileImageReveal.value) return

  if (reducedMotion) {
    gsap.set([profileWindow.value, profileImageReveal.value], { clearProps: 'clipPath,opacity,transform' })
    return
  }

  const timeline = gsap.timeline({ delay: 0.45 })
  timeline
    .from(profileWindow.value, {
      x: 50,
      opacity: 0,
      rotate: 2,
      duration: 2,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
    })
    .from(profileWindow.value, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 2,
      ease: 'power3.out',
      clearProps: 'clipPath',
    }, '<0.08')
    .from(profileImageReveal.value, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.8,
      ease: 'power3.inOut',
      clearProps: 'clipPath',
    }, '<0.08')
})

const stopChains = () => {
  chainsPlayer.value?.pause()
}

const observeChains = async () => {
  chainsObserver?.disconnect()
  stopChains()
  if (!isDesktop.value || prefersReducedMotion.value) return

  await nextTick()
  if (!hero.value || !chainsPlayer.value) return

  chainsObserver = new IntersectionObserver(([entry]) => {
    if (!entry) return
    if (entry.isIntersecting) void chainsPlayer.value?.play().catch(() => undefined)
    else stopChains()
  }, { threshold: 0.08 })

  chainsObserver.observe(hero.value)
}

const updateDesktop = () => {
  isDesktop.value = Boolean(desktopMedia?.matches)
}

watch([isDesktop, prefersReducedMotion], () => { void observeChains() })

onMounted(() => {
  if (typeof window.matchMedia !== 'function' || typeof window.IntersectionObserver !== 'function') return
  desktopMedia = window.matchMedia('(min-width: 38.0625rem)')
  desktopMedia.addEventListener('change', updateDesktop)
  updateDesktop()
})

onBeforeUnmount(() => {
  chainsObserver?.disconnect()
  desktopMedia?.removeEventListener('change', updateDesktop)
  stopChains()
})

const enter = (delay: number, extra: Record<string, number | string> = {}) => ({
  initial: prefersReducedMotion.value ? { opacity: 0 } : { opacity: 0, y: 16, ...extra },
  animate: { opacity: 1, y: 0, clipPath: 'none', scale: 1, rotate: 0 },
  transition: { duration: prefersReducedMotion.value ? 0.01 : 0.42, delay: prefersReducedMotion.value ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
})
</script>

<template>
  <section ref="hero" class="hero" aria-labelledby="hero-title">
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

    <div class="hero__portrait">
      <motion.img class="portrait-paper" :src="paperImage" alt="" aria-hidden="true" v-bind="enter(0.55, { scale: 0.97 })" />
      <div ref="profileWindow" class="portrait-window">
        <RetroWindow title="joao.dev - profile.exe" class="profile-window">
          <div ref="profileImageReveal" class="portrait-frame">
            <img :src="profileImage" alt="Retrato em preto e branco de João" width="1024" height="1365">
            <div class="portrait-frame__halftone" aria-hidden="true" />
          </div>
        </RetroWindow>
      </div>
      <motion.img class="portrait-badge" :src="heroBadge" alt="Fullstack developer" v-bind="enter(0.68, { scale: 0.92, rotate: -5 })" />
      <motion.img class="portrait-cursor" :src="cursorImage" alt="" aria-hidden="true" v-bind="enter(0.76, { y: 8, rotate: -7 })" />
    </div>
    <motion.img class="devmode-badge deco" :src="devmodeBadge" alt="Dev mode — sistemas online" v-bind="enter(0.72, { x: -8 })" />
    <motion.aside class="coordinates deco" aria-label="Localização" v-bind="enter(0.78)">
      <span class="coordinates__globe"><Icon class="retro-window__close-icon" icon="iconoir:www" /></span><span>−23.5505° S<br>−46.6333° W</span><strong>BRASIL</strong>
    </motion.aside>
    <motion.div class="vertical-note deco" v-bind="enter(0.82)">DESIGN + CODE + CREATE</motion.div>
    <motion.img class="barcode" :src="barCode" alt="one of a kind" v-bind="enter(0.68)" />
    <motion.div class="disposable deco" v-bind="enter(0.9)"><Icon class="disposable__icon" icon="mdi:recycle" aria-hidden="true" /><span>NON-DISPOSABLE</span></motion.div>
    <div v-if="isDesktop && !prefersReducedMotion" ref="chains" class="hero__chains" aria-hidden="true">
      <video
        ref="chainsPlayer"
        :src="chainsVideo"
        muted
        loop
        playsinline
        preload="metadata"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.hero { position: relative; min-height: clamp(40rem, 69vw, 51rem); padding: clamp(2.2rem, 6vw, 5.2rem) clamp(1rem, 8vw, 8.5rem) 7rem; overflow: visible; border-bottom: 1px solid var(--border); }
.hero__accessible-name { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.hero__content { position: relative; z-index: 4; width: min(55%, 47rem); margin-left: clamp(1rem, 5vw, 4.5rem); }
.hero__hello { margin: 0 0 .05rem; color: white; font-family: var(--font-display); font-size: clamp(2rem, 5.2vw, 5.1rem); line-height: 1; text-transform: uppercase; }
.hero__title { position: relative; width: max-content; margin: 0; color: var(--accent); font-size: clamp(2.6rem, 6.8vw, 7rem); line-height: 1.1; white-space: nowrap; }
.hero__wave { display: inline-block; margin-left: .25em; font-family: sans-serif; font-size: .37em; vertical-align: .35em; filter: grayscale(1) sepia(1) saturate(12) hue-rotate(190deg); }
.hero__role { margin: 1.5rem 0 .8rem; color: var(--text-primary); font-size: clamp(1rem, 2vw, 1.7rem); line-height: 1.15; letter-spacing: .02em; }
.hero__description { margin: 0; font-size: clamp(.85rem, 1.2vw, 1rem); line-height: 1.55; }
.hero__actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.35rem; }
.hero__portrait { position: absolute; z-index: 2; right: -14%; top: clamp(3rem, 5vw, 5rem); right: clamp(5.5rem, 9vw, 9rem); width: clamp(19rem, 32vw, 31rem); isolation: isolate; }
.portrait-window { position: relative; z-index: 2; transform: rotate(-3deg); transform-origin: center center; }
.portrait-paper { position: absolute; z-index: 0; top: -13%; right: -14%; width: 133%; height: 112%; object-fit: cover; opacity: .62; transform: rotate(2deg); pointer-events: none; }
.portrait-frame { height: clamp(24rem, 39vw, 38rem); background: #111; }
.portrait-frame img { width: 100%; height: 100%; object-fit: cover; object-position: center 18%; filter: grayscale(1) contrast(1.45) brightness(.9); }
.portrait-frame__halftone { position: absolute; inset: 0; opacity: .17; background: radial-gradient(circle, #fff 0 1px, transparent 1.2px); background-size: 4px 4px; mix-blend-mode: overlay; pointer-events: none; }
.profile-window { transform-origin: center center; }
.portrait-badge { position: absolute; z-index: 4; right: -18%; bottom: -9%; width: 58%; height: auto; transform: rotate(5deg); pointer-events: none; }
.portrait-cursor { position: absolute; z-index: 5; bottom: -6%; left: -4%; width: 24%; height: auto; transform: rotate(-50deg); filter: contrast(1.25); pointer-events: none; }
.hero__badge { position: absolute; z-index: 5; right: clamp(3rem, 6vw, 6rem); bottom: 6.5rem; display: flex; align-items: center; flex-direction: column; width: clamp(11rem, 17vw, 16rem); padding: 1.8rem 1rem; border: 1px solid #aaa; background: #080808; clip-path: polygon(7% 5%, 88% 0, 100% 18%, 94% 88%, 81% 100%, 9% 94%, 0 77%, 3% 16%); color: white; font-size: clamp(1rem, 1.8vw, 1.55rem); line-height: 1.05; transform: rotate(4deg); }
.hero__badge i { margin-top: .6rem; color: var(--accent-bright); font-size: 2rem; font-style: normal; }
.deco { position: absolute; z-index: 3; color: var(--text-secondary); font-size: .68rem; }
.devmode-badge { top: 1.2rem; left: 5px; width: clamp(6.5rem, 9vw, 8.5rem); height: auto; opacity: .9; }
.coordinates { top: 1rem; right: 0; display: flex; align-items: center; flex-direction: column; text-align: center; }
.coordinates__globe { display: grid; width: 3.4rem; height: 3.4rem; margin-bottom: .5rem; place-items: center; border: 1px solid white; border-radius: 50%; color: white; font-size: 2.5rem; }
.coordinates strong { margin-top: .25rem; color: white; font-weight: 400; }
.vertical-note { right: .4rem; bottom: 15rem; writing-mode: vertical-rl; font-size: 1.2rem;color: white; letter-spacing: .12em; }
.barcode { position: absolute; z-index: 3; left: 1.4rem; bottom: 3.5rem; width: clamp(4.5rem, 4vw, .5rem); height: auto; object-fit: contain;
}
.disposable { right: .4rem; bottom: 5rem; display: flex; align-items: center; flex-direction: column; gap: .15rem; color: white; writing-mode: vertical-rl; }
.disposable__icon { width: 1.7rem; height: 1.7rem; color: var(--accent-bright); }
.hero__chains {
  position: absolute;
  z-index: 1;  bottom: 2.5rem;
  width: min(82%);
  height: clamp(25rem, 20vw, 15rem);
  transform: translateX(-50%) rotate(53deg);
  overflow: visible;
  pointer-events: none;
}
.hero__chains video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.portrait-badge {
  animation: stack-card-flip 660ms steps(2, jump-none) infinite;
  animation-fill-mode: both;
  animation-play-state: running;
}

@keyframes stack-card-flip {
  0% {
    transform: rotate(1deg);
  }
  100% {
    transform: rotate(-1deg);
  }
}

@include breakpoint-down($breakpoint-tablet) {
  .hero { min-height: auto; padding: 3rem 1rem 6rem; }
  .hero__content { width: 62%; margin-left: 0; }
  .hero__portrait { top: 4.5rem; right: 1rem; width: 40%; }
  .portrait-frame { height: 31rem; }
  .devmode-badge, .coordinates, .vertical-note, .disposable { display: none; }
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
  .portrait-paper { top: -8%; right: -12%; width: 120%; height: 108%; }
  .portrait-badge { right: -4%; bottom: -5%; width: 53%; }
  .portrait-cursor { bottom: -4%; left: -3%; width: 22%; }
  .hero__badge { right: .35rem; bottom: 4rem; width: 11rem; }
  .barcode { display: none; }
  .desktop-only { display: none; }
  .hero__chains { display: none; }
}
</style>
