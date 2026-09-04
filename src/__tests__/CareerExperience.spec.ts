import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CareerExperience from '@/components/experiences/CareerExperience.vue'
import { careerExperiences } from '@/data/experiences'
import { careerSkillConnections, careerSkillNodes } from '@/data/careerSkills'
import { i18n, setLocale } from '@/i18n'

const mountCareer = () => mount(CareerExperience, {
  global: { plugins: [i18n] },
})

describe('CareerExperience', () => {
  beforeEach(() => setLocale('pt-BR', false))
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('loads a selected save and updates its active skill path', async () => {
    vi.useFakeTimers()
    const wrapper = mountCareer()

    expect(wrapper.text()).toContain('BPTECH_01.EXP')
    await wrapper.get('[data-save-id="aurora-digital"]').trigger('click')
    expect(wrapper.text()).toContain('LENDO DADOS DA CARREIRA')

    await vi.advanceTimersByTimeAsync(340)
    expect(wrapper.text()).toContain('AURORA_02.EXP')
    expect(wrapper.get('[aria-label="Habilidade: LARAVEL"]').classes()).toContain('is-active')
    expect(wrapper.get('[aria-label="Habilidade: VUE.JS"]').classes()).toContain('is-active')

    wrapper.unmount()
  })

  it('shows every contributor for a shared skill on touch or click', async () => {
    const wrapper = mountCareer()
    const vueNode = wrapper.get('[aria-label="Habilidade: VUE.JS"]')

    await vueNode.trigger('click')
    expect(vueNode.text()).toContain('Projeto Aurora Digital')
    expect(vueNode.text()).toContain('Nexora Systems')

    wrapper.unmount()
  })

  it('keeps one complete skill tree mounted and updates its highlighted network', async () => {
    vi.useFakeTimers()
    const wrapper = mountCareer()

    expect(wrapper.findAll('.career-skill-node')).toHaveLength(16)
    expect(wrapper.findAll('.career-skill-tree__path')).toHaveLength(18)
    expect(wrapper.get('[data-node-kind="core"]').isVisible()).toBe(true)
    expect(wrapper.get('[aria-label="Habilidade: SUPORTE"]').classes()).toContain('is-active')
    expect(wrapper.findAll('.career-skill-tree__path.is-active')).toHaveLength(3)

    await wrapper.get('[data-save-id="costa-crociere"]').trigger('click')
    await vi.advanceTimersByTimeAsync(340)

    expect(wrapper.findAll('.career-skill-node')).toHaveLength(16)
    expect(wrapper.get('[aria-label="Habilidade: COMUNICAÇÃO"]').classes()).toContain('is-active')
    expect(wrapper.get('[aria-label="Habilidade: INGLÊS"]').classes()).toContain('is-active')
    expect(wrapper.get('[aria-label="Habilidade: EQUIPE"]').classes()).toContain('is-active')
    expect(wrapper.get('[aria-label="Habilidade: SUPORTE"]').classes()).not.toContain('is-active')

    wrapper.unmount()
  })

  it('has valid normalized skill ids, coordinates and connection endpoints', () => {
    const nodeIds = new Set(careerSkillNodes.map(node => node.id))

    expect(careerSkillNodes.every(node => Number.isFinite(node.x) && Number.isFinite(node.y))).toBe(true)
    expect(careerSkillNodes.every(node => node.x >= 0 && node.x <= 100 && node.y >= 0 && node.y <= 100)).toBe(true)
    expect(careerExperiences.flatMap(experience => experience.skills).every(skillId => nodeIds.has(skillId))).toBe(true)
    expect(careerSkillConnections.every(connection => nodeIds.has(connection.from) && nodeIds.has(connection.to))).toBe(true)
  })

  it('navigates the memory carousel circularly in both directions', async () => {
    vi.useFakeTimers()
    const wrapper = mountCareer()

    await wrapper.get('[aria-label="Experiência anterior"]').trigger('click')
    await vi.advanceTimersByTimeAsync(340)
    expect(wrapper.text()).toContain('BAKCHOS_06.EXP')

    await wrapper.get('[aria-label="Próxima experiência"]').trigger('click')
    await vi.advanceTimersByTimeAsync(340)
    expect(wrapper.text()).toContain('BPTECH_01.EXP')

    wrapper.unmount()
  })

  it('translates career data and skill labels without mutating canonical sources', async () => {
    const canonicalRole = careerExperiences[0]?.role
    const canonicalNodeLabel = careerSkillNodes.find(node => node.id === 'customer-service')?.label
    const wrapper = mountCareer()

    setLocale('en', false)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('IT Technical Support Intern')
    expect(wrapper.get('[aria-label="Skill: CUSTOMER SERVICE"]')).toBeTruthy()
    expect(careerExperiences[0]?.role).toBe(canonicalRole)
    expect(careerSkillNodes.find(node => node.id === 'customer-service')?.label).toBe(canonicalNodeLabel)

    wrapper.unmount()
  })
})
