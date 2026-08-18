<script setup lang="ts">
import ExperienceCard from './ExperienceCard.vue'

interface Experience {
  period: string
  role: string
  company: string
  activities: string[]
  skills: string[]
  current?: boolean
}

const experiences: Experience[] = [
  {
    period: 'Jul. 2026 – Presente',
    role: 'Estágio Assistente Técnico TI',
    company: 'BP Tech',
    activities: ['Suporte técnico a usuários internos e resolução de problemas de hardware e software.', 'Instalação, configuração e atualização de equipamentos, softwares e periféricos.', 'Implementação de WhatsApp chatbot desenvolvido em Laravel.'],
    skills: ['Suporte', 'Hardware', 'Laravel'],
    current: true,
  },
  {
    period: 'Dez. 2025 – Jan. 2026',
    role: 'Desenvolvedor Full Stack Freelancer',
    company: 'Projeto Aurora Digital',
    activities: ['Desenvolvimento de painel administrativo com Laravel, Vue.js, MySQL e Bootstrap.', 'Criação de API REST com autenticação, validações, controllers e services.', 'Implementação de interface responsiva e integração completa entre frontend e backend.'],
    skills: ['Laravel', 'Vue.js', 'MySQL'],
  },
  {
    period: 'Ago. 2025 – Set. 2025',
    role: 'Desenvolvedor Frontend Freelancer',
    company: 'Nexora Systems',
    activities: ['Desenvolvimento em Vue.js com páginas responsivas, componentes reutilizáveis e consumo de APIs REST.', 'Criação de login, dashboard, listagens, formulários e páginas de detalhes.', 'Refatoração de componentes e organização de rotas.'],
    skills: ['Vue.js', 'REST API', 'SCSS'],
  },
  {
    period: 'Ago. 2025 – Abr. 2026',
    role: 'Barista',
    company: 'PiccoleBonta',
    activities: ['Atendimento ao cliente, preparação de bebidas e alimentos.', 'Organização de estoque e reposição de insumos.', 'Comunicação interpessoal, adaptação rápida e trabalho sob pressão.'],
    skills: ['Atendimento', 'Organização', 'Equipe'],
  },
  {
    period: 'Nov. 2023 – Jun. 2024',
    role: 'Barboy',
    company: 'Costa Crociere',
    activities: ['Atuação em ambiente multicultural de alta demanda.', 'Organização de estoque, reposição de insumos e apoio à equipe de bar.', 'Comunicação interpessoal, adaptação rápida e trabalho sob pressão.'],
    skills: ['Inglês', 'Comunicação', 'Equipe'],
  },
  {
    period: 'Ago. 2020 – Jul. 2022',
    role: 'Bartender',
    company: 'Bakchos PUB',
    activities: ['Atendimento ao cliente e preparação de drinks clássicos e autorais.', 'Organização de estoque e reposição de insumos.', 'Comunicação interpessoal, adaptação rápida e trabalho sob pressão.'],
    skills: ['Atendimento', 'Criatividade', 'Organização'],
  },
]
</script>

<template>
  <section class="timeline" aria-labelledby="timeline-title">
    <header class="timeline__header">
      <div>
        <p>01 / EXPERIÊNCIA</p>
        <h2 id="timeline-title">Histórico profissional</h2>
      </div>
      <span>{{ String(experiences.length).padStart(2, '0') }} REGISTROS ENCONTRADOS_</span>
    </header>
    <div class="timeline__list">
    <ExperienceCard
      v-for="(experience, index) in experiences"
      :key="`${experience.company}-${experience.period}`"
      v-bind="experience"
      :index="index + 1"
    />
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.timeline__header p,
.timeline__header > span {
  margin: 0 0 .65rem;
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: .68rem;
  letter-spacing: .1em;
}

.timeline__header > span { margin: 0; color: var(--text-secondary); }

h2 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 400;
  line-height: .8;
  text-transform: uppercase;
}

.timeline__list { position: relative; }
.timeline__list::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 9.75rem;
  width: 1px;
  background: linear-gradient(var(--accent), var(--border) 85%, transparent);
  content: '';
}

@media (max-width: 48rem) {
  .timeline__header { align-items: flex-start; flex-direction: column; }
  .timeline__list::before { left: .45rem; }
}
</style>
