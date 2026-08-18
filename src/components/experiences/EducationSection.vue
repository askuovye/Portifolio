<template>
  <section class="education" aria-labelledby="education-title">
    <header>
      <span>02 / FORMAÇÃO</span>
      <h2 id="education-title">Formação acadêmica</h2>
    </header>
    <div class="education__entry">
      <div class="education__year">2024<br>— 2028</div>
      <div>
        <p>GRADUAÇÃO • EM ANDAMENTO</p>
        <h3>Bacharelado em<br>Engenharia de Software</h3>
        <span>Centro Universitário UniGuairacá</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.education { height: 100%; padding: clamp(1.5rem, 4vw, 3.5rem); background: var(--surface); }
header span, .education__entry p { color: var(--accent-bright); font-family: var(--font-mono); font-size: .68rem; letter-spacing: .1em; }
h2 { margin: .65rem 0 0; font-family: var(--font-display); font-size: clamp(2.6rem, 5vw, 4.5rem); font-weight: 400; line-height: .8; text-transform: uppercase; }
.education__entry { display: grid; grid-template-columns: auto 1fr; gap: clamp(1.25rem, 3vw, 2.5rem); margin-top: clamp(3rem, 6vw, 5rem); padding-top: 1.5rem; border-top: 1px solid var(--border); }
.education__year { color: var(--text-secondary); font-family: var(--font-mono); font-size: .75rem; line-height: 1.6; }
.education__entry p { margin: 0 0 .8rem; }
h3 { margin: 0 0 .75rem; font-size: clamp(1.05rem, 2vw, 1.4rem); line-height: 1.35; }
.education__entry span { color: var(--text-secondary); font-size: .82rem; }
</style>
