<script setup lang="ts">
import ExperienceCard from './ExperienceCard.vue'

interface Experience {
  period: string
  role: string
  company: string
  activities: string[]
}

const experiences: Experience[] = [
  {
    period: 'Jul. 2026 – Presente',
    role: 'Estágio Assistente Técnico TI',
    company: 'BP Tech',
    activities: ['Suporte técnico a usuários internos e resolução de problemas de hardware e software.', 'Instalação, configuração e atualização de equipamentos, softwares e periféricos.', 'Implementação de WhatsApp chatbot desenvolvido em Laravel.'],
  },
  {
    period: 'Dez. 2025 – Jan. 2026',
    role: 'Desenvolvedor Full Stack Freelancer',
    company: 'Projeto Aurora Digital',
    activities: ['Desenvolvimento de painel administrativo com Laravel, Vue.js, MySQL e Bootstrap.', 'Criação de API REST com autenticação, validações, controllers e services.', 'Implementação de interface responsiva e integração completa entre frontend e backend.'],
  },
  {
    period: 'Ago. 2025 – Set. 2025',
    role: 'Desenvolvedor Frontend Freelancer',
    company: 'Nexora Systems',
    activities: ['Desenvolvimento em Vue.js com páginas responsivas, componentes reutilizáveis e consumo de APIs REST.', 'Criação de login, dashboard, listagens, formulários e páginas de detalhes.', 'Refatoração de componentes e organização de rotas.'],
  },
  {
    period: 'Ago. 2025 – Abr. 2026',
    role: 'Barista',
    company: 'PiccoleBonta',
    activities: ['Atendimento ao cliente, preparação de bebidas e alimentos.', 'Organização de estoque e reposição de insumos.', 'Comunicação interpessoal, adaptação rápida e trabalho sob pressão.'],
  },
  {
    period: 'Nov. 2023 – Jun. 2024',
    role: 'Barboy',
    company: 'Costa Crociere',
    activities: ['Atuação em ambiente multicultural de alta demanda.', 'Organização de estoque, reposição de insumos e apoio à equipe de bar.', 'Comunicação interpessoal, adaptação rápida e trabalho sob pressão.'],
  },
  {
    period: 'Ago. 2020 – Jul. 2022',
    role: 'Bartender',
    company: 'Bakchos PUB',
    activities: ['Atendimento ao cliente e preparação de drinks clássicos e autorais.', 'Organização de estoque e reposição de insumos.', 'Comunicação interpessoal, adaptação rápida e trabalho sob pressão.'],
  },
]
</script>

<template>
  <section aria-label="Experiências profissionais">
    <ExperienceCard
      v-for="experience in experiences"
      :key="`${experience.company}-${experience.period}`"
      v-bind="experience"
    />
  </section>
</template>
