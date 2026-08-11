export interface StackTechnology {
  name: string
  icon: string
  tone: 'blue' | 'light' | 'red'
}

export interface StackGroup {
  id: string
  technologies: [StackTechnology, StackTechnology]
}

export const stackGroups: StackGroup[] = [
  {
    id: 'frontend',
    technologies: [
      { name: 'Vue.js', icon: 'simple-icons:vuedotjs', tone: 'blue' },
      { name: 'Vite', icon: 'simple-icons:vite', tone: 'light' },
    ],
  },
  {
    id: 'backend',
    technologies: [
      { name: 'PHP', icon: 'simple-icons:php', tone: 'blue' },
      { name: 'Laravel', icon: 'simple-icons:laravel', tone: 'red' },
    ],
  },
  {
    id: 'database',
    technologies: [
      { name: 'PostgreSQL', icon: 'simple-icons:postgresql', tone: 'blue' },
      { name: 'MySQL', icon: 'simple-icons:mysql', tone: 'light' },
    ],
  },
  {
    id: 'tooling',
    technologies: [
      { name: 'Docker', icon: 'simple-icons:docker', tone: 'blue' },
      { name: 'Git', icon: 'simple-icons:git', tone: 'red' },
    ],
  },
]
