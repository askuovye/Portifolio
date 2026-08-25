import { careerExperiences } from './experiences'

export interface CareerSkillNode {
  id: string
  label: string
  x: number
  y: number
  experiences: string[]
  kind?: 'core' | 'skill' | 'locked'
}

export interface CareerSkillConnection {
  from: string
  to: string
  curve?: number
}

const experienceIdsFor = (skillId: string) => careerExperiences
  .filter(experience => experience.skills.includes(skillId))
  .map(experience => experience.id)

export const careerSkillNodes: CareerSkillNode[] = [
  { id: 'professional-core', label: 'PROFESSIONAL CORE', x: 50, y: 47, experiences: careerExperiences.map(item => item.id), kind: 'core' },
  { id: 'customer-service', label: 'ATENDIMENTO', x: 50, y: 10, experiences: experienceIdsFor('customer-service') },
  { id: 'organization', label: 'ORGANIZAÇÃO', x: 18, y: 17, experiences: experienceIdsFor('organization') },
  { id: 'teamwork', label: 'EQUIPE', x: 82, y: 18, experiences: experienceIdsFor('teamwork') },
  { id: 'communication', label: 'COMUNICAÇÃO', x: 30, y: 30, experiences: experienceIdsFor('communication') },
  { id: 'english', label: 'INGLÊS', x: 70, y: 30, experiences: experienceIdsFor('english') },
  { id: 'creativity', label: 'CRIATIVIDADE', x: 11, y: 54, experiences: experienceIdsFor('creativity') },
  { id: 'support', label: 'SUPORTE', x: 73, y: 51, experiences: experienceIdsFor('support') },
  { id: 'hardware', label: 'HARDWARE', x: 89, y: 62, experiences: experienceIdsFor('hardware') },
  { id: 'rest-api', label: 'REST API', x: 22, y: 67, experiences: experienceIdsFor('rest-api') },
  { id: 'laravel', label: 'LARAVEL', x: 45, y: 66, experiences: experienceIdsFor('laravel') },
  { id: 'mysql', label: 'MYSQL', x: 66, y: 70, experiences: experienceIdsFor('mysql') },
  { id: 'scss', label: 'SCSS', x: 14, y: 82, experiences: experienceIdsFor('scss') },
  { id: 'vue', label: 'VUE.JS', x: 42, y: 84, experiences: experienceIdsFor('vue') },
  { id: 'future-a', label: '???', x: 68, y: 91, experiences: [], kind: 'locked' },
  { id: 'future-b', label: '???', x: 89, y: 88, experiences: [], kind: 'locked' },
]

export const careerSkillConnections: CareerSkillConnection[] = [
  { from: 'professional-core', to: 'support', curve: -3 },
  { from: 'support', to: 'hardware', curve: 2 },
  { from: 'professional-core', to: 'laravel', curve: 2 },
  { from: 'laravel', to: 'vue', curve: 2 },
  { from: 'laravel', to: 'mysql', curve: -2 },
  { from: 'professional-core', to: 'vue', curve: 5 },
  { from: 'vue', to: 'rest-api', curve: -3 },
  { from: 'vue', to: 'scss', curve: 3 },
  { from: 'professional-core', to: 'customer-service' },
  { from: 'customer-service', to: 'organization', curve: -3 },
  { from: 'customer-service', to: 'teamwork', curve: 3 },
  { from: 'professional-core', to: 'teamwork', curve: 5 },
  { from: 'teamwork', to: 'english', curve: 2 },
  { from: 'teamwork', to: 'communication', curve: 6 },
  { from: 'professional-core', to: 'organization', curve: -5 },
  { from: 'organization', to: 'creativity', curve: -2 },
  { from: 'rest-api', to: 'future-a', curve: -5 },
  { from: 'communication', to: 'future-b', curve: 8 },
]
