import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ExperiencesSection from '@/components/home/ExperiencesSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import { careerSkillNodes } from '@/data/careerSkills'
import { careerExperiences } from '@/data/experiences'
import { projects } from '@/data/projects'
import { i18n, setLocale } from '@/i18n'

const mountWithI18n = (component: Parameters<typeof mount>[0]) => mount(component, {
  global: { plugins: [i18n] },
})

describe('Home data sections', () => {
  it('renders the first four projects from the canonical project data', () => {
    setLocale('pt-BR', false)
    const wrapper = mountWithI18n(ProjectsSection)
    const featuredProjects = projects.slice(0, 4)

    expect(wrapper.findAll('.project-summary')).toHaveLength(featuredProjects.length)
    featuredProjects.forEach((project) => {
      expect(wrapper.text()).toContain(project.title)
      project.technologies.forEach(technology => expect(wrapper.text()).toContain(technology))
    })
    projects.slice(4).forEach(project => expect(wrapper.text()).not.toContain(project.title))

    wrapper.unmount()
  })

  it('derives featured experiences and skill labels from canonical data', () => {
    setLocale('pt-BR', false)
    const wrapper = mountWithI18n(ExperiencesSection)
    const featuredIds = new Set(['bp-tech', 'aurora-digital', 'nexora-systems', 'costa-crociere'])
    const featuredExperiences = careerExperiences.filter(experience => featuredIds.has(experience.id))
    const skillLabels = new Map(careerSkillNodes.map(skill => [skill.id, skill.label]))

    expect(wrapper.findAll('.experience')).toHaveLength(featuredExperiences.length)
    featuredExperiences.forEach((experience) => {
      expect(wrapper.text()).toContain(experience.company)
      expect(wrapper.text()).toContain(experience.activities[0] ?? '')
      experience.skills.forEach((skill) => {
        expect(wrapper.text()).toContain(skillLabels.get(skill) ?? skill)
      })
    })

    wrapper.unmount()
  })

  it('translates Home experience content without changing canonical data', async () => {
    setLocale('pt-BR', false)
    const wrapper = mountWithI18n(ExperiencesSection)

    expect(wrapper.text()).toContain('Estágio Assistente Técnico TI')
    expect(careerExperiences[0]?.role).toBe('Estágio Assistente Técnico TI')

    setLocale('en', false)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('IT Technical Support Intern')
    expect(wrapper.text()).not.toContain('Estágio Assistente Técnico TI')
    expect(careerExperiences[0]?.role).toBe('Estágio Assistente Técnico TI')

    wrapper.unmount()
    setLocale('pt-BR', false)
  })
})
