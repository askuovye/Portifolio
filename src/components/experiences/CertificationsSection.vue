<script setup lang="ts">
const certifications = [
  { title: 'Front-end', issuer: 'CodeAcademy 3C' },
  { title: 'Eletrotécnica', issuer: 'SENAI' },
  { title: 'Desenvolvimento de jogos', issuer: 'Danki Code' },
]
</script>

<template>
  <section class="certifications" aria-labelledby="certifications-title">
    <header>
      <span>03 / CERTIFICADOS</span>
      <h2 id="certifications-title">Certificações</h2>
    </header>
    <ol>
      <li v-for="(certification, index) in certifications" :key="certification.title">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <div>
          <h4>{{ certification.title }}</h4>
          <p>{{ certification.issuer }}</p>
        </div>
        <span aria-hidden="true">↗</span>
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">
.certifications { height: 100%; padding: clamp(1.5rem, 4vw, 3.5rem); background: var(--surface); }
header span { color: var(--accent-bright); font-family: var(--font-mono); font-size: .68rem; letter-spacing: .1em; }
h2 { margin: .65rem 0 0; font-family: var(--font-display); font-size: clamp(2.6rem, 5vw, 4.5rem); font-weight: 400; line-height: .8; text-transform: uppercase; }
ol { margin: clamp(3rem, 6vw, 5rem) 0 0; padding: 0; border-top: 1px solid var(--border); list-style: none; }
li { display: grid; grid-template-columns: 2rem 1fr auto; align-items: center; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--border); }
li > span { color: var(--text-secondary); font-family: var(--font-mono); font-size: .68rem; }
li > span:last-child { color: var(--accent-bright); font-size: 1rem; }
h3 { margin: 0; font-size: .95rem; }
p { margin: .3rem 0 0; color: var(--text-secondary); font-family: var(--font-mono); font-size: .68rem; text-transform: uppercase; }
</style>
