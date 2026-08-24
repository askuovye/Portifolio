import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectPlayer from '@/components/projects/ProjectPlayer.vue'

describe('ProjectPlayer', () => {
  beforeEach(() => {
    vi.stubGlobal('requestAnimationFrame', vi.fn(() => 1))
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    vi.stubGlobal('IntersectionObserver', class {
      observe() {}
      unobserve() {}
      disconnect() {}
    })
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: vi.fn(),
    } as unknown as CanvasRenderingContext2D)
  })

  afterEach(() => {
    vi.restoreAllMocks()
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
    const pauseButton = wrapper.get('[aria-label="Pausar apresentação"]')

    expect(wrapper.get('.project-player__status').text()).toContain('Playing')
    await pauseButton.trigger('click')
    expect(wrapper.get('[aria-label="Reproduzir apresentação"]').attributes('aria-label')).toBe('Reproduzir apresentação')

    await wrapper.get('[aria-label="Reproduzir apresentação"]').trigger('click')
    expect(wrapper.get('[aria-label="Pausar apresentação"]').attributes('aria-label')).toBe('Pausar apresentação')

    wrapper.unmount()
  })

  it('renders complete equalizers in the display and playback status', () => {
    const wrapper = mount(ProjectPlayer)
    const displayEqualizer = wrapper.get('.project-player__format .equalizer')
    const statusEqualizer = wrapper.get('.project-player__status .equalizer')

    expect(displayEqualizer.findAll('i')).toHaveLength(7)
    expect(statusEqualizer.findAll('i')).toHaveLength(7)

    wrapper.unmount()
  })
})
