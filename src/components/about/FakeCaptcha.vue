<script setup lang="ts">
import { computed, ref } from 'vue'
import { motion } from 'motion-v'
import RetroWindow from '@/components/ui/RetroWindow.vue'
import profileImage from '@/assets/profile-joao.jpeg'
import chatbotImage from '@/assets/elements/chatbot.jpeg'
import { useEnterMotion } from '@/composables/useEnterMotion'

const { enter } = useEnterMotion()

interface CaptchaTile {
  id: number
  initialImage: string
  initialPosition: string
  finalPosition: string
}

const initialCrops = [
  'center 12%', 'center 32%', 'center 55%',
  'left 22%', 'center 45%', 'right 28%',
  'left 70%', 'center 78%', 'right 68%',
]

const tiles: CaptchaTile[] = Array.from({ length: 9 }, (_, index) => ({
  id: index,
  initialImage: index % 3 === 1 ? chatbotImage : profileImage,
  initialPosition: initialCrops[index] ?? 'center',
  finalPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`,
}))

const revealed = ref<boolean[]>(Array.from({ length: 9 }, () => false))
const isVerified = ref(false)
const revealedCount = computed(() => revealed.value.filter(Boolean).length)
const isComplete = computed(() => revealedCount.value === tiles.length)

const revealTile = (index: number) => {
  if (revealed.value[index]) return
  revealed.value[index] = true
  revealed.value = [...revealed.value]
  if (isComplete.value) isVerified.value = true
}

const reset = () => {
  revealed.value = Array.from({ length: 9 }, () => false)
  isVerified.value = false
}
</script>

<template>
  <RetroWindow class="captcha" title="human_check.exe" close-label="Janela decorativa de verificação">
    <div class="captcha__body">
      <header class="captcha__prompt">
        <motion.h2 v-bind="enter(0.82)">Selecione todos os quadrados com <strong>UM CARA MANEIRO</strong></motion.h2>
        <motion.p v-bind="enter(0.9)">Clique nas 9 imagens para revelar a identidade.</motion.p>
      </header>

      <div class="captcha__grid" :class="{ 'captcha__grid--complete': isComplete }" role="group" aria-label="Desafio visual com nove imagens">
        <button
          v-for="tile in tiles"
          :key="tile.id"
          type="button"
          class="captcha__tile"
          :class="{ 'captcha__tile--revealed': revealed[tile.id] }"
          :aria-label="revealed[tile.id] ? `Imagem ${tile.id + 1} revelada` : `Revelar imagem ${tile.id + 1}`"
          :aria-pressed="revealed[tile.id]"
          @click="revealTile(tile.id)"
        >
          <span
            class="captcha__image captcha__image--initial"
            :style="{
              backgroundImage: `url(${tile.initialImage})`,
              backgroundPosition: tile.initialPosition,
            }"
          />
          <span
            class="captcha__image captcha__image--final"
            :style="{
              backgroundImage: `url(${profileImage})`,
              backgroundPosition: tile.finalPosition,
            }"
          />
          <span class="captcha__check" aria-hidden="true">✓</span>
        </button>
      </div>

      <footer class="captcha__footer">
        <div class="captcha__progress" aria-live="polite">
          <span :class="{ 'captcha__status--verified': isVerified }">
            {{ isVerified ? 'IDENTIDADE_VERIFICADA' : `SELECIONADOS ${revealedCount}/09` }}
          </span>
        </div>
        <button class="captcha__reset" type="button" :disabled="revealedCount === 0" @click="reset">
          {{ isComplete ? '[ REINICIAR ]' : '[ LIMPAR ]' }}
        </button>
      </footer>
    </div>
  </RetroWindow>
</template>

<style scoped lang="scss">
.captcha { width: min(100%, 31rem); }
.captcha__body { padding: clamp(.75rem, 2vw, 1.1rem); background: #090909; }
.captcha__prompt { padding: 1rem; background: var(--accent); color: white; }
.captcha__prompt > span { display: block; margin-bottom: .65rem; font-family: var(--font-mono); font-size: .6rem; letter-spacing: .1em; }
.captcha__prompt h2 { max-width: 20rem; margin: 0; font-family: Arial, sans-serif; font-size: clamp(1rem, 2vw, 1.25rem); font-weight: 500; line-height: 1.22; }
.captcha__prompt h2 strong { display: block; font-size: 1.45em; }
.captcha__prompt p { margin: .55rem 0 0; color: rgb(255 255 255 / 78%); font-family: var(--font-mono); font-size: .65rem; }

.captcha__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  aspect-ratio: 1 / 1;
  gap: 3px;
  margin-top: 3px;
  background: #050505;
  max-width: 100%;
}

.captcha__tile {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 0;
  padding: 0;
  background: #111;
  cursor: crosshair;
}

.captcha__tile:focus-visible { z-index: 3; outline: 2px solid white; outline-offset: -3px; }
.captcha__image { position: absolute; inset: 0; display: block; background-repeat: no-repeat; }
.captcha__image--initial { background-size: cover; filter: grayscale(1) contrast(1.18); transition: opacity 180ms steps(2), transform 220ms ease; }
.captcha__image--final { opacity: 0; background-size: 300% 300%; filter: grayscale(1) contrast(1.35); transform: scale(.93); transition: opacity 180ms steps(2), transform 220ms ease; }
.captcha__tile:hover .captcha__image--initial { transform: scale(1.04); }
.captcha__tile--revealed .captcha__image--initial { opacity: 0; transform: scale(1.08); }
.captcha__tile--revealed .captcha__image--final { opacity: 1; transform: scale(1); }
.captcha__check { position: absolute; z-index: 2; top: .35rem; right: .35rem; display: grid; width: 1.2rem; height: 1.2rem; place-items: center; border: 1px solid white; background: var(--accent); color: white; font-family: Arial, sans-serif; font-size: .75rem; opacity: 0; transform: scale(.5) rotate(-8deg); transition: opacity 150ms ease, transform 180ms ease; }
.captcha__tile--revealed .captcha__check { opacity: 1; transform: scale(1) rotate(0); }
.captcha__grid--complete { gap: 0; }
.captcha__grid--complete .captcha__check { opacity: 0; }

.captcha__footer { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 3rem; padding: .75rem .35rem 0; border-top: 1px solid var(--border); font-family: var(--font-mono); }
.captcha__progress { color: var(--text-secondary); font-size: .62rem; letter-spacing: .06em; }
.captcha__status--verified { color: #4cff75; }
.captcha__reset { border: 0; background: transparent; color: var(--accent-bright); font-family: inherit; font-size: .65rem; cursor: pointer; }
.captcha__reset:disabled { color: #555; cursor: default; }

@media (prefers-reduced-motion: reduce) {
  .captcha__image, .captcha__check { transition: none; }
}
</style>
