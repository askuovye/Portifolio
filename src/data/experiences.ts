export interface CareerExperience {
  id: string
  slot: number
  company: string
  role: string
  period: string
  activities: string[]
  status: 'active' | 'completed'
  saveFile: string
  skills: string[]
}

export const careerExperiences: CareerExperience[] = [
  {
    id: 'bp-tech',
    slot: 1,
    company: 'BP Tech',
    role: 'Estágio Assistente Técnico TI',
    period: 'Jul. 2026 – Presente',
    activities: [
      'Suporte técnico a usuários internos e resolução de problemas de hardware e software.',
      'Instalação, configuração e atualização de equipamentos, softwares e periféricos.',
      'Implementação de WhatsApp chatbot desenvolvido em Laravel.',
    ],
    status: 'active',
    saveFile: 'BPTECH_01.EXP',
    skills: ['support', 'hardware', 'laravel'],
  },
  {
    id: 'aurora-digital',
    slot: 2,
    company: 'Projeto Aurora Digital',
    role: 'Desenvolvedor Full Stack Freelancer',
    period: 'Dez. 2025 – Jan. 2026',
    activities: [
      'Desenvolvimento de painel administrativo com Laravel, Vue.js, MySQL e Bootstrap.',
      'Criação de API REST com autenticação, validações, controllers e services.',
      'Implementação de interface responsiva e integração completa entre frontend e backend.',
    ],
    status: 'completed',
    saveFile: 'AURORA_02.EXP',
    skills: ['laravel', 'vue', 'mysql'],
  },
  {
    id: 'nexora-systems',
    slot: 3,
    company: 'Nexora Systems',
    role: 'Desenvolvedor Frontend Freelancer',
    period: 'Ago. 2025 – Set. 2025',
    activities: [
      'Desenvolvimento em Vue.js com páginas responsivas, componentes reutilizáveis e consumo de APIs REST.',
      'Criação de login, dashboard, listagens, formulários e páginas de detalhes.',
      'Refatoração de componentes e organização de rotas.',
    ],
    status: 'completed',
    saveFile: 'NEXORA_03.EXP',
    skills: ['vue', 'rest-api', 'scss'],
  },
  {
    id: 'piccole-bonta',
    slot: 4,
    company: 'PiccoleBonta',
    role: 'Barista',
    period: 'Ago. 2025 – Abr. 2026',
    activities: [
      'Atendimento ao cliente, preparação de bebidas e alimentos.',
      'Organização de estoque e reposição de insumos.',
      'Comunicação interpessoal, adaptação rápida e trabalho sob pressão.',
    ],
    status: 'completed',
    saveFile: 'PICCOLE_04.EXP',
    skills: ['customer-service', 'organization', 'teamwork'],
  },
  {
    id: 'costa-crociere',
    slot: 5,
    company: 'Costa Crociere',
    role: 'Barboy',
    period: 'Nov. 2023 – Jun. 2024',
    activities: [
      'Atuação em ambiente multicultural de alta demanda.',
      'Organização de estoque, reposição de insumos e apoio à equipe de bar.',
      'Comunicação interpessoal, adaptação rápida e trabalho sob pressão.',
    ],
    status: 'completed',
    saveFile: 'COSTA_05.EXP',
    skills: ['english', 'communication', 'teamwork'],
  },
  {
    id: 'bakchos-pub',
    slot: 6,
    company: 'Bakchos PUB',
    role: 'Bartender',
    period: 'Ago. 2020 – Jul. 2022',
    activities: [
      'Atendimento ao cliente e preparação de drinks clássicos e autorais.',
      'Organização de estoque e reposição de insumos.',
      'Comunicação interpessoal, adaptação rápida e trabalho sob pressão.',
    ],
    status: 'completed',
    saveFile: 'BAKCHOS_06.EXP',
    skills: ['customer-service', 'creativity', 'organization'],
  },
]
