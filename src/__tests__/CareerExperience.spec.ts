import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CareerExperience from '@/components/experiences/CareerExperience.vue'

describe('CareerExperience', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('loads a selected save and updates its active skill path', async () => {
    vi.useFakeTimers()
    const wrapper = mount(CareerExperience)

    expect(wrapper.text()).toContain('BPTECH_01.EXP')
    await wrapper.get('[data-save-id="aurora-digital"]').trigger('click')
    expect(wrapper.text()).toContain('READING CAREER DATA')

    await vi.advanceTimersByTimeAsync(340)
    expect(wrapper.text()).toContain('AURORA_02.EXP')
    expect(wrapper.get('[aria-label^="LARAVEL,"]').classes()).toContain('is-active')
    expect(wrapper.get('[aria-label^="VUE.JS,"]').classes()).toContain('is-active')

    wrapper.unmount()
  })

  it('shows every contributor for a shared skill on touch or click', async () => {
    const wrapper = mount(CareerExperience)
    const vueNode = wrapper.get('[aria-label^="VUE.JS,"]')

    await vueNode.trigger('click')
    expect(vueNode.text()).toContain('Projeto Aurora Digital')
    expect(vueNode.text()).toContain('Nexora Systems')

    wrapper.unmount()
  })

  it('navigates the memory carousel circularly in both directions', async () => {
    vi.useFakeTimers()
    const wrapper = mount(CareerExperience)

    await wrapper.get('[aria-label="Experiência anterior"]').trigger('click')
    await vi.advanceTimersByTimeAsync(340)
    expect(wrapper.text()).toContain('BAKCHOS_06.EXP')

    await wrapper.get('[aria-label="Próxima experiência"]').trigger('click')
    await vi.advanceTimersByTimeAsync(340)
    expect(wrapper.text()).toContain('BPTECH_01.EXP')

    wrapper.unmount()
  })
})
