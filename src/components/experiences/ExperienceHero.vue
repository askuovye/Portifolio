<template>
  <section class="experience-hero" aria-labelledby="experience-title">
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
  </section>
</template>

<style scoped lang="scss">
.experience-hero {
  position: relative;
  display: grid;
  gap: clamp(3rem, 7vw, 6rem);
  min-height: clamp(26rem, 56vh, 38rem);
  padding: clamp(1rem, 3vw, 2.5rem) clamp(1rem, 4vw, 4rem) clamp(4rem, 9vw, 8rem);
  overflow: hidden;
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

@media (max-width: 48rem) {
  .experience-hero { min-height: 28rem; }
  .experience-hero__copy { gap: 1.5rem; }
  .experience-hero__intro { max-width: 28rem; }
  .experience-hero__status { left: 1rem; right: auto; }
}
</style>
