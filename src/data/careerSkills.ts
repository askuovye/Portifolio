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
}

const experienceIdsFor = (skillId: string) => careerExperiences
  .filter(experience => experience.skills.includes(skillId))
  .map(experience => experience.id)

export const careerSkillNodes: CareerSkillNode[] = [
  { id: 'professional-core', label: 'PROFESSIONAL CORE', x: 50, y: 50, experiences: careerExperiences.map(item => item.id), kind: 'core' },
  { id: 'support', label: 'SUPORTE', x: 72, y: 34, experiences: experienceIdsFor('support') },
  { id: 'hardware', label: 'HARDWARE', x: 87, y: 51, experiences: experienceIdsFor('hardware') },
  { id: 'laravel', label: 'LARAVEL', x: 69, y: 69, experiences: experienceIdsFor('laravel') },
  { id: 'vue', label: 'VUE.JS', x: 48, y: 82, experiences: experienceIdsFor('vue') },
  { id: 'mysql', label: 'MYSQL', x: 31, y: 70, experiences: experienceIdsFor('mysql') },
  { id: 'rest-api', label: 'REST API', x: 17, y: 52, experiences: experienceIdsFor('rest-api') },
  { id: 'scss', label: 'SCSS', x: 30, y: 31, experiences: experienceIdsFor('scss') },
  { id: 'customer-service', label: 'ATENDIMENTO', x: 51, y: 17, experiences: experienceIdsFor('customer-service') },
  { id: 'organization', label: 'ORGANIZAÇÃO', x: 12, y: 25, experiences: experienceIdsFor('organization') },
  { id: 'teamwork', label: 'EQUIPE', x: 87, y: 22, experiences: experienceIdsFor('teamwork') },
  { id: 'english', label: 'INGLÊS', x: 93, y: 73, experiences: experienceIdsFor('english') },
  { id: 'communication', label: 'COMUNICAÇÃO', x: 73, y: 88, experiences: experienceIdsFor('communication') },
  { id: 'creativity', label: 'CRIATIVIDADE', x: 10, y: 78, experiences: experienceIdsFor('creativity') },
  { id: 'future-a', label: '???', x: 5, y: 52, experiences: [], kind: 'locked' },
  { id: 'future-b', label: '???', x: 95, y: 93, experiences: [], kind: 'locked' },
]

export const careerSkillConnections: CareerSkillConnection[] = [
  { from: 'professional-core', to: 'support' },
  { from: 'support', to: 'hardware' },
  { from: 'professional-core', to: 'laravel' },
  { from: 'laravel', to: 'vue' },
  { from: 'laravel', to: 'mysql' },
  { from: 'professional-core', to: 'vue' },
  { from: 'vue', to: 'rest-api' },
  { from: 'vue', to: 'scss' },
  { from: 'professional-core', to: 'customer-service' },
  { from: 'customer-service', to: 'organization' },
  { from: 'customer-service', to: 'teamwork' },
  { from: 'professional-core', to: 'teamwork' },
  { from: 'teamwork', to: 'english' },
  { from: 'teamwork', to: 'communication' },
  { from: 'professional-core', to: 'organization' },
  { from: 'organization', to: 'creativity' },
  { from: 'rest-api', to: 'future-a' },
  { from: 'communication', to: 'future-b' },
]
