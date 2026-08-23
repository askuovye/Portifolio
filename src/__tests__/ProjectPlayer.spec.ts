import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectPlayer from '@/components/projects/ProjectPlayer.vue'

describe('ProjectPlayer', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1))
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('selects tracks and navigates circularly', async () => {
    const wrapper = mount(ProjectPlayer)
    const tracks = wrapper.findAll('.playlist-track')

    expect(tracks[0]?.attributes('aria-current')).toBe('true')

    await tracks[2]?.trigger('click')
    expect(wrapper.text()).toContain('Chatbot Langchain')
    expect(wrapper.findAll('.playlist-track')[2]?.attributes('aria-current')).toBe('true')

    await wrapper.get('[aria-label="Próximo projeto"]').trigger('click')
    await wrapper.get('[aria-label="Próximo projeto"]').trigger('click')
    expect(wrapper.findAll('.playlist-track')[0]?.attributes('aria-current')).toBe('true')

    await wrapper.get('[aria-label="Projeto anterior"]').trigger('click')
    expect(wrapper.findAll('.playlist-track')[3]?.attributes('aria-current')).toBe('true')

    wrapper.unmount()
  })

  it('toggles its visual playback state', async () => {
    const wrapper = mount(ProjectPlayer)
    const playButton = wrapper.get('[aria-label="Reproduzir apresentação"]')

    await playButton.trigger('click')
    expect(wrapper.get('[aria-label="Pausar apresentação"]').attributes('aria-label')).toBe('Pausar apresentação')
    expect(wrapper.get('.project-player__status').text()).toContain('Playing')

    await wrapper.get('[aria-label="Pausar apresentação"]').trigger('click')
    expect(wrapper.get('[aria-label="Reproduzir apresentação"]').attributes('aria-label')).toBe('Reproduzir apresentação')

    wrapper.unmount()
  })
})
