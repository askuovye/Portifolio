<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { useReducedMotion } from 'motion-v'
import { useI18n } from 'vue-i18n'
import type { Project } from '@/data/projects'

const props = defineProps<{ project: Project; isPlaying: boolean }>()

const cover = ref<HTMLElement | null>(null)
const media = ref<HTMLImageElement | HTMLVideoElement | null>(null)
const pausedFrame = ref<HTMLCanvasElement | null>(null)
const hasPausedFrame = ref(false)
const prefersReducedMotion = useReducedMotion()
const { t } = useI18n()

const moveCover = (event: PointerEvent) => {
  if (prefersReducedMotion.value || event.pointerType === 'touch' || !cover.value) return
  const bounds = cover.value.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width - .5
  const y = (event.clientY - bounds.top) / bounds.height - .5
  cover.value.style.setProperty('--cover-rotate-x', `${y * -4}deg`)
  cover.value.style.setProperty('--cover-rotate-y', `${x * 6}deg`)
}

const resetCover = () => {
  cover.value?.style.removeProperty('--cover-rotate-x')
  cover.value?.style.removeProperty('--cover-rotate-y')
}

const capturePausedFrame = async () => {
  await nextTick()
  const source = media.value
  const canvas = pausedFrame.value
  if (!source || !canvas) return

  const sourceWidth = source instanceof HTMLVideoElement ? source.videoWidth : source.naturalWidth
  const sourceHeight = source instanceof HTMLVideoElement ? source.videoHeight : source.naturalHeight
  const isReady = source instanceof HTMLVideoElement ? source.readyState >= 2 : source.complete
  if (!isReady || !sourceWidth || !sourceHeight) return

  canvas.width = sourceWidth
  canvas.height = sourceHeight
  const context = canvas.getContext('2d')
  if (!context) return
  context.drawImage(source, 0, 0, canvas.width, canvas.height)
  hasPausedFrame.value = true
}

watch(() => props.isPlaying, (playing) => {
  if (playing) hasPausedFrame.value = false
  else void capturePausedFrame()
}, { immediate: true })

watch(() => props.project.id, () => {
  hasPausedFrame.value = false
  if (!props.isPlaying) void capturePausedFrame()
})
</script>

<template>
  <section class="now-playing" aria-labelledby="now-playing-title">
    <header class="now-playing__header">
      <h2 id="now-playing-title">{{ t('projects.nowPlaying.title') }}</h2>
      <span>DEV.MP3 / {{ project.year }}</span>
    </header>

    <div class="now-playing__scroll">
      <div ref="cover" class="now-playing__cover" @pointermove="moveCover" @pointerleave="resetCover">
      <div class="now-playing__cover-bar" aria-hidden="true">
        <span>{{ project.id }}.exe</span>
        <span>— □ ×</span>
      </div>
      <div class="now-playing__image-wrap">
        <video
          v-if="project.mediaType === 'video'"
          ref="media"
          :src="project.image"
          autoplay
          loop
          muted
          playsinline
          preload="metadata"
          :aria-label="t('projects.nowPlaying.animatedPreviewAlt', { project: project.title })"
          @loadeddata="!isPlaying && capturePausedFrame()"
        />
        <img v-else ref="media" :src="project.image" :alt="t('projects.nowPlaying.previewAlt', { project: project.title })" @load="!isPlaying && capturePausedFrame()">
        <canvas ref="pausedFrame" class="now-playing__paused-frame" :class="{ 'now-playing__paused-frame--visible': hasPausedFrame }" aria-hidden="true" />
        <span class="now-playing__scanlines" aria-hidden="true" />
        <span class="now-playing__reflection" aria-hidden="true" />
      </div>
      </div>

      <div class="now-playing__details">
      <p class="now-playing__meta">{{ t('projects.player.track').toUpperCase() }} {{ String(project.track).padStart(2, '0') }} · {{ project.category }}</p>
      <h3>{{ project.title }}</h3>
      <p class="now-playing__subtitle">{{ project.subtitle }}</p>
      <p class="now-playing__description">{{ project.description }}</p>

      <div class="now-playing__stack">
        <span>STACK:</span>
        <ul :aria-label="t('projects.nowPlaying.technologiesLabel')">
          <li v-for="technology in project.technologies" :key="technology">{{ technology }}</li>
        </ul>
      </div>

      <div v-if="project.live || project.github" class="now-playing__actions">
        <a v-if="project.live" :href="project.live" target="_blank" rel="noopener noreferrer">
          <Icon icon="mdi:open-in-new" aria-hidden="true" />
          {{ t('projects.nowPlaying.viewProject') }}
        </a>
        <a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer">
          <Icon icon="mdi:github" aria-hidden="true" />
          {{ t('projects.nowPlaying.sourceCode') }}
        </a>
      </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.now-playing {
  display: flex;
  height: 100%;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  padding: .75rem;
  border: 1px solid #4c4c4c;
  background:
    linear-gradient(rgb(255 255 255 / 1.5%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 1.5%) 1px, transparent 1px),
    #080808;
  background-size: 22px 22px;
  box-shadow: inset 1px 1px #e7e7e7, inset -1px -1px #333;
}

.now-playing__scroll {
  min-height: 0;
  padding: .1rem .2rem .5rem;
  overflow-y: auto;
  scrollbar-color: var(--accent) #111;
  scrollbar-width: thin;
}

.now-playing__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 2.75rem;
  margin-bottom: .85rem;
  padding: .55rem .75rem;
  border-bottom: 2px solid var(--accent);
  background: #bdbdbd;
  color: #0a277e;
}

.now-playing__header h2 { font-size: .82rem; font-weight: 700; letter-spacing: .04em; }
.now-playing__header span { font-size: .62rem; text-transform: uppercase; }

.now-playing__cover {
  --cover-rotate-x: 0deg;
  --cover-rotate-y: 0deg;
  position: relative;
  z-index: 1;
  margin: 0 .15rem;
  border: 1px solid #e2e2e2;
  background: #090909;
  box-shadow: 7px 8px 0 rgb(23 60 255 / 22%), 0 16px 28px rgb(0 0 0 / 45%);
  transform: perspective(850px) rotateX(var(--cover-rotate-x)) rotateY(var(--cover-rotate-y));
  transition: transform 140ms ease-out;
  transform-style: preserve-3d;
}

.now-playing__cover-bar {
  display: flex;
  justify-content: space-between;
  padding: .42rem .6rem;
  background: linear-gradient(90deg, #071b70, var(--accent), #071b70);
  color: white;
  font-size: .64rem;
  font-weight: 700;
  text-transform: uppercase;
}

.now-playing__image-wrap {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: .45rem solid #151515;
}

.now-playing__image-wrap img,
.now-playing__image-wrap video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.now-playing__paused-frame { position: absolute; inset: 0; z-index: 1; display: none; width: 100%; height: 100%; object-fit: cover; }
.now-playing__paused-frame--visible { display: block; }

.now-playing__scanlines,
.now-playing__reflection { position: absolute; inset: 0; pointer-events: none; }
.now-playing__scanlines { opacity: .1; background: repeating-linear-gradient(0deg, transparent 0 3px, #000 3px 4px); }
.now-playing__reflection { background: linear-gradient(120deg, rgb(255 255 255 / 10%), transparent 28% 72%, rgb(49 87 255 / 8%)); }

.now-playing__details { padding: clamp(1.2rem, 3vw, 2rem) .2rem .25rem; }
.now-playing__meta { margin: 0 0 .6rem; color: #62ff77; font-size: .63rem; letter-spacing: .08em; text-transform: uppercase; }
.now-playing__details h3 { margin: 0; color: var(--accent-bright); font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: .8; }
.now-playing__subtitle { margin: .8rem 0 0; color: white; font-size: clamp(.85rem, 1.4vw, 1.05rem); text-transform: uppercase; }
.now-playing__description { max-width: 48rem; margin: .8rem 0 0; color: #c2c2c2; font-size: .78rem; line-height: 1.65; }

.now-playing__stack { display: flex; align-items: flex-start; gap: .7rem; margin-top: 1.25rem; }
.now-playing__stack > span { padding-top: .28rem; color: var(--accent-bright); font-size: .68rem; }
.now-playing__stack ul { display: flex; flex-wrap: wrap; gap: .45rem; margin: 0; padding: 0; list-style: none; }
.now-playing__stack li { padding: .27rem .5rem; border: 1px solid #777; background: #0b0b0b; color: #e6e6e6; font-size: .65rem; }

.now-playing__actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 1.35rem; }
.now-playing__actions a {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  min-height: 2.65rem;
  padding: .55rem .9rem;
  border: 1px solid #111;
  background: #bdbdbd;
  box-shadow: inset 1px 1px white, inset -2px -2px #555;
  color: #080808;
  font-size: .7rem;
  font-weight: 700;
  text-transform: uppercase;
}
.now-playing__actions a:hover { background: #d7d7d7; transform: translateY(-1px); }
.now-playing__actions a:active { box-shadow: inset 2px 2px #555, inset -1px -1px white; transform: translate(1px, 1px); }
.now-playing__actions svg { width: 1rem; height: 1rem; }

@media (hover: none) { .now-playing__cover { transform: none; } }
@media (prefers-reduced-motion: reduce) { .now-playing__cover { transform: none; transition: none; } }
</style>
