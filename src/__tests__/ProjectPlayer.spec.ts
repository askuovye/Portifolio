import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProjectPlayer from '@/components/projects/ProjectPlayer.vue'
import { projects } from '@/data/projects'
import { i18n, setLocale } from '@/i18n'

const mountPlayer = () => mount(ProjectPlayer, {
  global: { plugins: [i18n] },
})

describe('ProjectPlayer', () => {
  beforeEach(() => {
    setLocale('pt-BR', false)
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
    const wrapper = mountPlayer()
    const tracks = wrapper.findAll('.playlist-track')

    expect(tracks[0]?.attributes('aria-current')).toBe('true')

    await tracks[2]?.trigger('click')
    expect(wrapper.text()).toContain('Chatbot Langchain')
    expect(wrapper.findAll('.playlist-track')[2]?.attributes('aria-current')).toBe('true')

    await tracks[tracks.length - 1]?.trigger('click')
    await wrapper.get('[aria-label="Próximo projeto"]').trigger('click')
    expect(wrapper.findAll('.playlist-track')[0]?.attributes('aria-current')).toBe('true')

    await wrapper.get('[aria-label="Projeto anterior"]').trigger('click')
    expect(wrapper.findAll('.playlist-track')[projects.length - 1]?.attributes('aria-current')).toBe('true')

    wrapper.unmount()
  })

  it('toggles its visual playback state', async () => {
    const wrapper = mountPlayer()
    const pauseButton = wrapper.get('[aria-label="Pausar apresentação"]')

    expect(wrapper.get('.project-player__status').text()).toContain('Reproduzindo')
    await pauseButton.trigger('click')
    expect(wrapper.get('[aria-label="Reproduzir apresentação"]').attributes('aria-label')).toBe('Reproduzir apresentação')

    await wrapper.get('[aria-label="Reproduzir apresentação"]').trigger('click')
    expect(wrapper.get('[aria-label="Pausar apresentação"]').attributes('aria-label')).toBe('Pausar apresentação')

    wrapper.unmount()
  })

  it('renders complete equalizers in the display and playback status', () => {
    const wrapper = mountPlayer()
    const displayEqualizer = wrapper.get('.project-player__format .equalizer')
    const statusEqualizer = wrapper.get('.project-player__status .equalizer')

    expect(displayEqualizer.findAll('i')).toHaveLength(7)
    expect(statusEqualizer.findAll('i')).toHaveLength(7)

    wrapper.unmount()
  })

  it('translates project copy without changing canonical project data', async () => {
    const canonicalSubtitle = projects[0]?.subtitle
    const wrapper = mountPlayer()

    expect(wrapper.text()).toContain('Sistema de gestão econômica para brechós')

    setLocale('en', false)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Financial management system for thrift stores')
    expect(wrapper.text()).toContain('Project playlist')
    expect(wrapper.text()).not.toContain('Sistema de gestão econômica para brechós')
    expect(projects[0]?.subtitle).toBe(canonicalSubtitle)

    wrapper.unmount()
  })
})
