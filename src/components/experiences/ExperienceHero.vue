<template>
  <section class="experience-hero" aria-labelledby="experience-title">
    <div class="experience-hero__meta">
      <span>ARQUIVO_02</span>
      <span>CARREIRA.LOG</span>
    </div>
    <div class="experience-hero__copy">
      <p class="experience-hero__eyebrow">HISTÓRICO PROFISSIONAL</p>
      <h1 id="experience-title">Minha<br><span>trajetória</span></h1>
      <p class="experience-hero__intro">
        Uma carreira construída entre tecnologia, atendimento e resolução de problemas —
        transformando experiências diferentes em repertório para criar soluções melhores.
      </p>
    </div>
    <div class="experience-hero__status" aria-label="Status profissional">
      <span class="experience-hero__pulse" aria-hidden="true" />
      <span>DISPONÍVEL PARA NOVOS DESAFIOS</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
.experience-hero {
  position: relative;
  min-height: clamp(30rem, 68vh, 46rem);
  padding: clamp(1rem, 3vw, 2.5rem) clamp(1rem, 4vw, 4rem) clamp(2.5rem, 6vw, 5rem);
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  background:
    linear-gradient(90deg, transparent 49.9%, rgb(255 255 255 / 5%) 50%, transparent 50.1%),
    radial-gradient(circle at 82% 45%, rgb(23 60 255 / 22%), transparent 30%),
    var(--background);
}

.experience-hero::after {
  position: absolute;
  right: -3vw;
  bottom: -0.22em;
  color: rgb(255 255 255 / 2.8%);
  content: 'EXP';
  font-family: var(--font-display);
  font-size: clamp(14rem, 32vw, 34rem);
  line-height: .65;
  pointer-events: none;
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
  grid-template-columns: minmax(0, 1.5fr) minmax(16rem, .7fr);
  align-items: end;
  gap: clamp(2rem, 7vw, 7rem);
  margin-top: clamp(4.5rem, 10vw, 9rem);
}

.experience-hero__eyebrow {
  position: absolute;
  top: -2rem;
  margin: 0;
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: .72rem;
  letter-spacing: .12em;
}

h1 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(5rem, 13vw, 12.5rem);
  font-weight: 400;
  letter-spacing: -.055em;
  line-height: .63;
  text-transform: uppercase;
}

h1 span { color: var(--accent-bright); }

.experience-hero__intro {
  max-width: 32rem;
  margin: 0 0 .25rem;
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

@media (max-width: 48rem) {
  .experience-hero { min-height: 31rem; }
  .experience-hero__copy { grid-template-columns: 1fr; margin-top: 6rem; gap: 2rem; }
  .experience-hero__intro { max-width: 28rem; }
  .experience-hero__status { left: 1rem; right: auto; }
}
</style>
