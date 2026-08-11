<script setup lang="ts">
interface ExperienceSummary {
  role: string
  companyAndPeriod: string
  description: string
}

const experiences: ExperienceSummary[] = [
  {
    role: 'Barboy',
    companyAndPeriod: 'Costa Crociere Nov. 2023 – Jun. 2024',
    description: 'Atuação em ambiente multicultural de alta demanda, suporte à operação de bares, atendimento ao cliente, organização de estoque e trabalho sob pressão.',
  },
  {
    role: 'Desenvolvedor Frontend Freelancer',
    companyAndPeriod: 'Nexora Systems Ago. 2025 – Set. 2025',
    description: 'Desenvolvimento de frontend em Vue.js, páginas responsivas, componentes reutilizáveis, consumo de APIs REST e refatoração de componentes.',
  },
  {
    role: 'Desenvolvedor Full Stack Freelancer',
    companyAndPeriod: 'Projeto Aurora Digital Dez. 2025 – Jan. 2026',
    description: 'Desenvolvimento de painel administrativo com Laravel, Vue.js, MySQL e Bootstrap, incluindo API REST e integração entre frontend e backend.',
  },
  {
    role: 'Estágio Assistente Técnico TI',
    companyAndPeriod: 'BP Tech Jul. 2026 – Set. 2026',
    description: 'Suporte técnico, manutenção de sistemas e redes, instalação de equipamentos e implementação de WhatsApp chatbot em Laravel.',
  },
]
</script>

<template>
  <section>
    <h3>Experiências</h3>
    <div>
      <article v-for="experience in experiences" :key="experience.role">
        <h4>{{ experience.role }}</h4>
        <p>{{ experience.companyAndPeriod }}</p>
        <p>{{ experience.description }}</p>
      </article>
    </div>
  </section>
</template>
