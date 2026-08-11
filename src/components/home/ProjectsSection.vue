<script setup lang="ts">
interface ProjectSummary {
  name: string
  technologies: string[]
}

const projects: ProjectSummary[] = [
  { name: 'Vestock', technologies: ['Vue.js', 'Laravel', 'PostgreSQL'] },
  { name: 'Ecolink', technologies: ['Laravel', 'Flutter', 'MySQL'] },
  { name: 'Chatbot Langchain', technologies: ['Python', 'Langchain', 'GrokAPI'] },
  { name: 'Kinect Galery', technologies: ['Vue.js', 'SCSS', 'JavaScript'] },
]
</script>

<template>
  <section>
    <h3>Projetos</h3>
    <div>
      <article v-for="project in projects" :key="project.name">
        <h4>{{ project.name }}</h4>
        <p v-for="technology in project.technologies" :key="technology">{{ technology }}</p>
      </article>
    </div>
  </section>
</template>
