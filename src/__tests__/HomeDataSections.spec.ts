import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import ExperiencesSection from '@/components/home/ExperiencesSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import { careerSkillNodes } from '@/data/careerSkills'
import { careerExperiences } from '@/data/experiences'
import { projects } from '@/data/projects'

describe('Home data sections', () => {
  it('renders every project from the canonical project data', () => {
    const wrapper = mount(ProjectsSection)

    expect(wrapper.findAll('.project-summary')).toHaveLength(projects.length)
    projects.forEach((project) => {
      expect(wrapper.text()).toContain(project.title)
      project.technologies.forEach(technology => expect(wrapper.text()).toContain(technology))
    })

    wrapper.unmount()
  })

  it('derives featured experiences and skill labels from canonical data', () => {
    const wrapper = mount(ExperiencesSection)
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
})
