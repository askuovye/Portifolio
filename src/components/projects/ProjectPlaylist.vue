<script setup lang="ts">
import type { Project } from '@/data/projects'
import { useI18n } from 'vue-i18n'
import ProjectEqualizer from './ProjectEqualizer.vue'

defineProps<{
  projects: Project[]
  activeIndex: number
  isPlaying: boolean
}>()

const emit = defineEmits<{
  select: [index: number]
}>()

const { t } = useI18n()
</script>

<template>
  <section class="playlist" aria-labelledby="playlist-title">
    <header class="playlist__header">
      <h2 id="playlist-title">{{ t('projects.playlist.title') }}</h2>
      <span>{{ t('projects.playlist.trackCount', { count: String(projects.length).padStart(2, '0') }) }}</span>
    </header>

    <ol class="playlist__tracks">
      <li v-for="(project, index) in projects" :key="project.id">
        <button
          class="playlist-track"
          :class="{ 'playlist-track--active': activeIndex === index }"
          type="button"
          :aria-current="activeIndex === index ? 'true' : undefined"
          :aria-label="t('projects.playlist.selectProject', { project: project.title })"
          @click="emit('select', index)"
        >
          <span class="playlist-track__marker" aria-hidden="true">
            {{ activeIndex === index ? '▶' : String(project.track).padStart(2, '0') }}
          </span>
          <img :src="project.thumbnail ?? project.image" :alt="t('projects.playlist.thumbnailAlt', { project: project.title })" loading="lazy">
          <span class="playlist-track__copy">
            <strong>{{ project.title }}</strong>
            <small>{{ project.category }}</small>
          </span>
          <ProjectEqualizer
            v-if="activeIndex === index"
            class="playlist-track__equalizer"
            :playing="isPlaying"
          />
          <span class="playlist-track__duration">{{ project.duration }}</span>
        </button>
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.playlist {
  display: flex;
  height: 100%;
  min-width: 0;
  min-height: 0;
  flex-direction: column;
  padding: .75rem;
  border: 1px solid #4c4c4c;
  background: #080808;
  box-shadow: inset 1px 1px #e7e7e7, inset -1px -1px #333;
}

.playlist__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 2.75rem;
  padding: .55rem .75rem;
  border-bottom: 2px solid var(--accent);
  background: #bdbdbd;
  color: #0a277e;
}

.playlist__header h2 {
  font-size: .82rem;
  font-weight: 700;
  letter-spacing: .04em;
}

.playlist__header span {
  font-size: .65rem;
  text-transform: uppercase;
}

.playlist__tracks {
  min-height: 0;
  margin: .3rem 0 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-color: var(--accent) #111;
  scrollbar-width: thin;
  list-style: none;
}

.playlist__tracks li + li { border-top: 1px solid #484848; }

.playlist-track {
  position: relative;
  display: grid;
  grid-template-columns: 2rem 4.25rem minmax(0, 1fr) auto;
  align-items: center;
  gap: .7rem;
  width: 100%;
  min-height: 6.2rem;
  padding: .65rem;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
}

.playlist-track:hover { background: #111; }
.playlist-track:active { transform: translate(1px, 1px); }

.playlist-track--active {
  border-color: var(--accent-bright);
  background: linear-gradient(90deg, rgb(23 60 255 / 28%), rgb(5 5 5 / 92%));
  box-shadow: inset 3px 0 var(--accent-bright), 0 0 12px rgb(23 60 255 / 15%);
}

.playlist-track__marker {
  color: #ddd;
  font-size: 1rem;
  text-align: center;
}

.playlist-track--active .playlist-track__marker { color: #62ff77; }

.playlist-track img {
  width: 4.25rem;
  height: 4.25rem;
  border: 1px solid #9b9b9b;
  object-fit: cover;
  filter: contrast(1.1) saturate(.8);
}

.playlist-track__copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: .3rem;
}

.playlist-track__copy strong {
  overflow: hidden;
  color: white;
  font-size: clamp(.82rem, 1.35vw, 1.05rem);
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.playlist-track__copy small {
  overflow: hidden;
  color: var(--text-secondary);
  font-size: .63rem;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.playlist-track__equalizer {
  position: absolute;
  right: .65rem;
  bottom: 1.8rem;
  color: #62ff77;
}

.playlist-track__duration {
  align-self: end;
  color: #bbb;
  font-size: .67rem;
}

@include breakpoint-down($breakpoint-tablet) {
  .playlist { height: auto; }
  .playlist__tracks {
    display: flex;
    gap: .5rem;
    padding-bottom: .5rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scrollbar-color: var(--accent) #111;
  }

  .playlist__tracks li {
    flex: 0 0 min(18rem, 82vw);
    border: 0;
    scroll-snap-align: start;
  }

  .playlist-track { min-height: 5.4rem; }
}
</style>
