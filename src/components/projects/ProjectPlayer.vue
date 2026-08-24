<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { motion, useReducedMotion } from 'motion-v'
import RetroWindow from '@/components/ui/RetroWindow.vue'
import { gsap } from '@/animations/gsap'
import { useEnterMotion } from '@/composables/useEnterMotion'
import { projects } from '@/data/projects'
import ProjectEqualizer from './ProjectEqualizer.vue'
import ProjectNowPlaying from './ProjectNowPlaying.vue'
import ProjectPlaylist from './ProjectPlaylist.vue'

const activeProjectIndex = ref(0)
const isPlaying = ref(true)
const progress = ref(0)
const player = ref<HTMLElement | null>(null)
const nowPlayingContent = ref<HTMLElement | null>(null)
const prefersReducedMotion = useReducedMotion()
const { enter } = useEnterMotion(.7)
const activeProject = computed(() => projects[activeProjectIndex.value] ?? projects[0]!)
const elapsedTime = computed(() => formatTime(activeProject.value.durationSeconds * progress.value / 100))

let animationFrame: number | undefined
let previousTimestamp: number | undefined
let contentTween: gsap.core.Timeline | undefined

function formatTime(totalSeconds: number) {
  const seconds = Math.floor(totalSeconds)
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

const stopProgressLoop = () => {
  if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
  animationFrame = undefined
  previousTimestamp = undefined
}

const nextProject = () => {
  activeProjectIndex.value = (activeProjectIndex.value + 1) % projects.length
  progress.value = 0
}

const previousProject = () => {
  activeProjectIndex.value = (activeProjectIndex.value - 1 + projects.length) % projects.length
  progress.value = 0
}

const selectProject = (index: number) => {
  if (index === activeProjectIndex.value) return
  activeProjectIndex.value = index
  progress.value = 0
}

const updateProgress = (timestamp: number) => {
  if (!isPlaying.value) return
  if (previousTimestamp === undefined) previousTimestamp = timestamp
  const elapsed = timestamp - previousTimestamp
  previousTimestamp = timestamp
  progress.value += elapsed / (activeProject.value.durationSeconds * 10)

  if (progress.value >= 100) nextProject()
  animationFrame = window.requestAnimationFrame(updateProgress)
}

const startProgressLoop = () => {
  stopProgressLoop()
  animationFrame = window.requestAnimationFrame(updateProgress)
}

const togglePlay = () => {
  isPlaying.value = !isPlaying.value
}

const seek = (event: PointerEvent) => {
  const track = event.currentTarget as HTMLElement
  const bounds = track.getBoundingClientRect()
  progress.value = Math.min(100, Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100))
  previousTimestamp = undefined
}

const seekWithKeyboard = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowUp') progress.value = Math.min(100, progress.value + 5)
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') progress.value = Math.max(0, progress.value - 5)
  else if (event.key === 'Home') progress.value = 0
  else if (event.key === 'End') progress.value = 100
  else return
  event.preventDefault()
  previousTimestamp = undefined
}

const handlePlayerKeydown = (event: KeyboardEvent) => {
  if (event.target instanceof HTMLAnchorElement || event.target instanceof HTMLButtonElement) return
  if (event.code === 'Space') {
    event.preventDefault()
    togglePlay()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    nextProject()
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    previousProject()
  }
}

watch(isPlaying, (playing) => {
  if (playing) startProgressLoop()
  else stopProgressLoop()
}, { immediate: true })

watch(activeProjectIndex, async () => {
  await nextTick()
  if (prefersReducedMotion.value || !nowPlayingContent.value) return
  contentTween?.kill()
  contentTween = gsap.timeline()
    .fromTo(nowPlayingContent.value, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .32, ease: 'power3.out' })
    .from(nowPlayingContent.value.querySelectorAll('.now-playing__stack li, .now-playing__actions a'), {
      y: 5,
      opacity: 0,
      duration: .2,
      stagger: .035,
      ease: 'power2.out',
    }, '-=.15')
})

onBeforeUnmount(() => {
  stopProgressLoop()
  contentTween?.kill()
})
</script>

<template>
  <section
    ref="player"
    class="project-player"
    tabindex="0"
    aria-label="Player de projetos. Use as setas para navegar e espaço para reproduzir ou pausar."
    @keydown="handlePlayerKeydown"
  >
    <motion.div v-bind="enter(.12, { scale: .985 })">
      <RetroWindow title="JOAO_DEV.MP3 — PROJECT PLAYER" close-label="Janela do player de projetos">
      <div class="project-player__shell">
        <div class="project-player__display" aria-live="polite">
          <span aria-hidden="true">▶</span>
          <div class="project-player__marquee">
            <p :key="activeProject.id">NOW PLAYING: {{ activeProject.title }} — {{ activeProject.subtitle }}</p>
          </div>
          <div class="project-player__format" aria-hidden="true">
            <span>STEREO</span><span>44.1 KHZ</span><span>320 KBPS</span>
            <ProjectEqualizer :playing="isPlaying" />
          </div>
        </div>

        <div class="project-player__main">
          <ProjectPlaylist
            :projects="projects"
            :active-index="activeProjectIndex"
            :is-playing="isPlaying"
            @select="selectProject"
          />
          <div ref="nowPlayingContent" class="project-player__now-playing">
            <ProjectNowPlaying :project="activeProject" :is-playing="isPlaying" />
          </div>
        </div>

        <div class="project-player__controls">
          <div class="project-player__counter">
            <span>Track</span>
            <strong>{{ String(activeProject.track).padStart(2, '0') }} / {{ String(projects.length).padStart(2, '0') }}</strong>
          </div>

          <div class="project-player__transport">
            <button type="button" aria-label="Projeto anterior" @click="previousProject">
              <Icon icon="mdi:skip-previous" aria-hidden="true" />
            </button>
            <button class="project-player__play" type="button" :aria-label="isPlaying ? 'Pausar apresentação' : 'Reproduzir apresentação'" @click="togglePlay">
              <Icon :icon="isPlaying ? 'mdi:pause' : 'mdi:play'" aria-hidden="true" />
            </button>
            <button type="button" aria-label="Próximo projeto" @click="nextProject">
              <Icon icon="mdi:skip-next" aria-hidden="true" />
            </button>
          </div>

          <div class="project-player__status" :class="{ 'project-player__status--playing': isPlaying }">
            <span>{{ isPlaying ? 'Playing' : 'Paused' }}</span>
            <ProjectEqualizer :playing="isPlaying" />
          </div>

          <div class="project-player__timeline">
            <time>{{ elapsedTime }}</time>
            <button
              class="project-player__progress"
              type="button"
              :aria-label="`Progresso da apresentação: ${Math.round(progress)}%. Clique para alterar.`"
              :aria-valuenow="Math.round(progress)"
              aria-valuemin="0"
              aria-valuemax="100"
              role="slider"
              @pointerdown="seek"
              @keydown="seekWithKeyboard"
            >
              <span :style="{ transform: `scaleX(${progress / 100})` }" />
              <i :style="{ left: `${progress}%` }" aria-hidden="true" />
            </button>
            <time>{{ activeProject.duration }}</time>
          </div>
        </div>
      </div>
      </RetroWindow>
    </motion.div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.project-player { outline: none; }
.project-player:focus-visible { outline: 2px solid var(--accent-bright); outline-offset: 4px; }

.project-player__shell {
  padding: clamp(.55rem, 1.5vw, 1rem);
  background: #aaa;
  color: #080808;
  box-shadow: inset 2px 2px #f4f4f4, inset -2px -2px #4a4a4a;
}

.project-player__display {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: .7rem;
  min-height: 4rem;
  padding: .65rem 1rem;
  border: 2px inset #ddd;
  background: #030806;
  color: #62ff77;
  text-shadow: 0 0 8px rgb(98 255 119 / 42%);
}

.project-player__marquee { min-width: 0; overflow: hidden; }
.project-player__marquee p { width: max-content; margin: 0; color: inherit; font-size: clamp(.72rem, 1.4vw, 1.05rem); letter-spacing: .03em; text-transform: uppercase; animation: lcd-enter .35s steps(4); }
.project-player__format { display: flex; align-items: center; flex: 0 0 auto; gap: .45rem; }
.project-player__format > span { padding: .2rem .35rem; border: 1px solid #387f42; font-size: .55rem; white-space: nowrap; }
.project-player__format > :deep(.equalizer) { align-self: center; }

.project-player__main {
  display: grid;
  grid-template-columns: minmax(19rem, .78fr) minmax(0, 1.22fr);
  gap: .35rem;
  margin-top: .45rem;
  height: clamp(32rem, 62vh, 42rem);
  min-height: 0;
}

.project-player__now-playing { min-width: 0; min-height: 0; }
.project-player__now-playing > :deep(*) { height: 100%; }

.project-player__controls {
  display: grid;
  grid-template-columns: 7rem auto 9rem minmax(12rem, 1fr);
  align-items: stretch;
  gap: .35rem;
  margin-top: .45rem;
  padding: .55rem;
  border: 1px solid #555;
  background: #bdbdbd;
  box-shadow: inset 1px 1px white, inset -1px -1px #555;
}

.project-player__counter,
.project-player__status {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px inset #ddd;
  background: #050805;
  color: #62ff77;
  text-transform: uppercase;
}
.project-player__counter span, .project-player__status span { font-size: .55rem; }
.project-player__counter strong { font-size: .9rem; }
.project-player__status { flex-direction: row; gap: .65rem; color: #777; }
.project-player__status--playing { color: #62ff77; }

.project-player__transport { display: flex; gap: .3rem; }
.project-player__transport button {
  display: grid;
  width: 3.7rem;
  min-height: 3.7rem;
  place-items: center;
  border: 1px solid #111;
  background: #c8c8c8;
  box-shadow: inset 2px 2px white, inset -2px -2px #555;
  color: #060606;
  cursor: pointer;
}
.project-player__transport button:hover { background: #112a83; }
.project-player__transport button:active { box-shadow: inset 2px 2px #555, inset -1px -1px white; transform: translate(1px, 1px); }
.project-player__transport svg { width: 1.7rem; height: 1.7rem; }
.project-player__transport .project-player__play { background: #1636a8; color: white; }

.project-player__timeline {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: .65rem;
  padding: 0 .7rem;
  border: 2px inset #ddd;
  background: #080808;
  color: #62ff77;
}
.project-player__timeline time { font-size: .72rem; }
.project-player__progress {
  position: relative;
  height: .7rem;
  padding: 0;
  border: 1px inset #bdbdbd;
  background: #252525;
  cursor: pointer;
}
.project-player__progress span { display: block; width: 100%; height: 100%; background: var(--accent); transform-origin: left; }
.project-player__progress i { position: absolute; top: 50%; width: .8rem; height: 1.35rem; border: 1px solid #222; background: #bdbdbd; box-shadow: inset 1px 1px white, inset -1px -1px #555; transform: translate(-50%, -50%); }

@keyframes lcd-enter { from { opacity: 0; transform: translateX(.75rem); } }

@include breakpoint-down($breakpoint-tablet) {
  .project-player__main { display: flex; height: auto; flex-direction: column-reverse; }
  .project-player__controls { grid-template-columns: 6.5rem 1fr 8rem; }
  .project-player__transport { justify-content: center; }
  .project-player__timeline { grid-column: 1 / -1; min-height: 3rem; }
}

@include breakpoint-down($breakpoint-mobile) {
  .project-player__shell { padding: .35rem; }
  .project-player__display { grid-template-columns: auto minmax(0, 1fr); padding-inline: .65rem; }
  .project-player__format { display: none; }
  .project-player__controls { grid-template-columns: 1fr; }
  .project-player__counter, .project-player__status { min-height: 2.7rem; }
  .project-player__transport { grid-row: 1; }
  .project-player__timeline { grid-column: auto; }
}

@media (prefers-reduced-motion: reduce) {
  .project-player__marquee p { animation: none; }
  .project-player__progress span { transition: none; }
}
</style>
