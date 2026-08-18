<script setup lang="ts">
import ProjectCard, { type Project } from './ProjectCard.vue'
import projectPlaceholder from '@/assets/elements/sticker.png'

const projects: Project[] = [
  {
    id: 'vestock',
    title: 'Vestock — sistema de gestão econômica para brechós',
    slug: 'vestock',
    image: projectPlaceholder,
    technologies: ['Vue.js', 'Laravel', 'PostgreSQL'],
    description: 'Controle de peças, consignações e fluxo financeiro para evitar erros e identificar a margem real por peça.',
    category: 'Web app',
  },
  {
    id: 'ecolink',
    title: 'Ecolink — plataforma de conectividade de reciclagem',
    slug: 'ecolink',
    image: projectPlaceholder,
    technologies: ['Laravel', 'Flutter', 'MySQL'],
    description: 'Conecta pessoas a pontos de coleta próximos e mostra como descartar seus resíduos apropriadamente.',
    category: 'Mobile',
  },
  {
    id: 'chatbot-langchain',
    title: 'Chatbot Langchain — chatbot de perguntas e respostas',
    slug: 'chatbot-langchain',
    image: projectPlaceholder,
    technologies: ['Python', 'Langchain', 'GrokAPI'],
    description: 'Chatbot que utiliza a API da Grok para responder perguntas sobre qualquer assunto.',
    category: 'Inteligência artificial',
  },
  {
    id: 'kinect-gallery',
    title: 'Kinect Galery — galeria de imagens com efeitos de transição',
    slug: 'kinect-gallery',
    image: projectPlaceholder,
    technologies: ['Vue.js', 'SCSS', 'JavaScript'],
    description: 'Rede social inspirada no Instagram e no DeviantArt, criada como projeto final do curso de FrontEnd CodeAcademy da 3C.',
    category: 'Frontend',
  },
]
</script>

<template>
  <section>
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </section>
</template>
