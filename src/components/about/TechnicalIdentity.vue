<template>
  <section class="technical-identity" aria-labelledby="technical-identity-title">
    <div class="technical-identity__content">
      <h3 id="technical-identity-title">Identidade<br>Técnica</h3>
      <p>Construo aplicações full stack com Laravel e Vue, mas também gosto de mexer onde a maioria não vai — de matemática de câmera 3D em jogos até debugar driver de kernel no Linux quando a solução óbvia não existe.</p>
    </div>
  </section>
</template>

<style scoped lang="scss">
.technical-identity {
  padding: clamp(2rem, 5vw, 5rem);
  border: 1px solid var(--border);
  background: var(--background);
}

.technical-identity__label {
  margin: 0 0 clamp(2rem, 4vw, 3.5rem);
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: .68rem;
  letter-spacing: .12em;
}

.technical-identity__content {
  display: grid;
  grid-template-columns: minmax(15rem, .8fr) minmax(18rem, 1.2fr);
  align-items: start;
  gap: clamp(2rem, 8vw, 8rem);
}

h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 7vw, 7rem);
  font-weight: 400;
  line-height: .78;
  text-transform: uppercase;
}

.technical-identity__content p {
  max-width: 45rem;
  margin: 0;
  padding-top: .4rem;
  color: var(--text-secondary);
  font-size: clamp(.88rem, 1.2vw, 1rem);
  line-height: 1.8;
}

@media (max-width: 48rem) {
  .technical-identity__content { grid-template-columns: 1fr; }
}
</style>
