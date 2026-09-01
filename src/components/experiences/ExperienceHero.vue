<script setup lang="ts">
import { ref } from 'vue'
import kuromiVideo from '@/assets/animations/kuromi.mp4'
import barcodeSmileyImage from '@/assets/elements/barcode-smiley.png'
import { useDecorativeVideo } from '@/composables/useDecorativeVideo'

const hero = ref<HTMLElement | null>(null)
const kuromiPlayer = ref<HTMLVideoElement | null>(null)
useDecorativeVideo(kuromiPlayer, { target: hero, threshold: .08 })
</script>

<template>
  <section ref="hero" class="experience-hero" aria-labelledby="experience-title">
    <div class="experience-hero__meta">
      <span>ARQUIVO_02</span>
      <span>CARREIRA.LOG</span>
    </div>
    <div class="experience-hero__copy">
      <h1 id="experience-title">Experiência</h1>
      <p class="experience-hero__intro">
        Uma carreira construída entre tecnologia, atendimento e resolução de problemas —
        transformando experiências diferentes em repertório para criar soluções melhores.
      </p>
    </div>
    <div class="experience-hero__status" aria-label="Status profissional">
      <span class="experience-hero__pulse" aria-hidden="true" />
      <span>DISPONÍVEL PARA NOVOS DESAFIOS</span>
    </div>
    <video
      ref="kuromiPlayer"
      class="experience-hero__kuromi"
      :src="kuromiVideo"
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
    />
    <div class="experience-hero__barcode" aria-hidden="true">
      <span class="experience-hero__barcode-top">+55(42) 98443 1307</span>
      <span class="experience-hero__barcode-side">SE-589-52312-D</span>
      <img :src="barcodeSmileyImage" alt="">
    </div>
  </section>
</template>

<style scoped lang="scss">
.experience-hero {
  position: relative;
  display: grid;
  gap: clamp(3rem, 7vw, 6rem);
  min-height: clamp(26rem, 56vh, 38rem);
  padding: clamp(1rem, 3vw, 2.5rem) clamp(1rem, 4vw, 4rem) clamp(4rem, 9vw, 8rem);
  overflow: visible;
  background-size: 28px 28px;
}

.experience-hero__meta {
  display: flex;
  position: relative;
  z-index: 1;
  justify-content: space-between;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: .68rem;
  letter-spacing: .12em;
}

.experience-hero__copy {
  position: relative;
  z-index: 1;
  display: grid;
  gap: clamp(1.25rem, 3vw, 2.5rem);
  max-width: 68rem;
}

h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(4rem, 11vw, 10rem);
  font-weight: 400;
  letter-spacing: -.035em;
  line-height: .78;
  filter: none;
  text-shadow: none;
  text-transform: uppercase;
}

.experience-hero__intro {
  max-width: 44rem;
  margin: 0;
  color: var(--text-secondary);
  font-size: clamp(.9rem, 1.3vw, 1.05rem);
  line-height: 1.7;
}

.experience-hero__status {
  position: absolute;
  z-index: 1;
  right: clamp(1rem, 4vw, 4rem);
  bottom: clamp(1rem, 2vw, 2rem);
  display: flex;
  align-items: center;
  gap: .55rem;
  font-family: var(--font-mono);
  font-size: .65rem;
  letter-spacing: .08em;
}

.experience-hero__pulse {
  width: .55rem;
  height: .55rem;
  background: #4cff75;
  box-shadow: 0 0 12px #4cff75;
}

.experience-hero__kuromi {
  position: absolute;
  z-index: 1;
  top: clamp(3.5rem, 7vw, 6rem);
  right: clamp(.25rem, 2vw, 1rem);
  display: block;
  width: clamp(13.18rem, 24.34vw, 22.31rem);
  height: clamp(13.18rem, 24.34vw, 22.31rem);
  object-fit: contain;
  filter: contrast(1.06) brightness(.9);
}

.experience-hero__barcode {
  position: absolute;
  z-index: 1;
  bottom: -2.5rem;
  left: clamp(1rem, 4vw, 4rem);
  width: clamp(12.6rem, 21vw, 18.2rem);
  padding-top: .85rem;
  padding-left: 1.1rem;
  color: #d8d8d8;
  font-family: var(--font-mono);
  font-size: clamp(.53rem, .67vw, .7rem);
  font-weight: 700;
  letter-spacing: .04em;
  transform: translateY(20%);
}

.experience-hero__barcode img { display: block; width: 100%; height: auto; }
.experience-hero__barcode-top { position: absolute; top: 0; right: .15rem; }
.experience-hero__barcode-side {
  position: absolute;
  bottom: .05rem;
  left: 0;
  font-size: .88rem;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
}

@media (max-width: 48rem) {
  .experience-hero { min-height: 28rem; }
  .experience-hero__copy { gap: 1.5rem; }
  .experience-hero__intro { max-width: 28rem; }
  .experience-hero__status { left: 1rem; right: auto; }
  .experience-hero__kuromi { top: 4.25rem; right: 1rem; width: 13.18rem; height: 13.18rem; }
  .experience-hero__barcode { bottom: -.5rem; width: 12.6rem; }
}
</style>
