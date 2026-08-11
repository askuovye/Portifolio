<script setup lang="ts">
import ProjectCard from './ProjectCard.vue'

interface Project {
  title: string
  technologies: string[]
  description: string
  status?: string
}

const projects: Project[] = [
  {
    title: 'Vestock — sistema de gestão econômica para brechós',
    technologies: ['Vue.js', 'Laravel', 'PostgreSQL'],
    description: 'Controle de peças, consignações e fluxo financeiro para evitar erros e identificar a margem real por peça.',
    status: 'Em desenvolvimento',
  },
  {
    title: 'Ecolink — plataforma de conectividade de reciclagem',
    technologies: ['Laravel', 'Flutter', 'MySQL'],
    description: 'Conecta pessoas a pontos de coleta próximos e mostra como descartar seus resíduos apropriadamente.',
    status: 'Versão 1.0',
  },
  {
    title: 'Chatbot Langchain — chatbot de perguntas e respostas',
    technologies: ['Python', 'Langchain', 'GrokAPI'],
    description: 'Chatbot que utiliza a API da Grok para responder perguntas sobre qualquer assunto.',
    status: 'Versão 1.0',
  },
  {
    title: 'Kinect Galery — galeria de imagens com efeitos de transição',
    technologies: ['Vue.js', 'SCSS', 'JavaScript'],
    description: 'Rede social inspirada no Instagram e no DeviantArt, criada como projeto final do curso de FrontEnd CodeAcademy da 3C.',
  },
]
</script>

<template>
  <section>
    <ProjectCard
      v-for="project in projects"
      :key="project.title"
      v-bind="project"
    />
  </section>
</template>
