import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutView from '@/views/AboutView.vue'
import { i18n, setLocale } from '@/i18n'

const mountAbout = () => mount(AboutView, {
  global: { plugins: [i18n] },
})

class IntersectionObserverMock {
  readonly root = null
  readonly rootMargin = '0px'
  readonly thresholds = [0]

  constructor(private readonly callback: IntersectionObserverCallback) {}

  observe(target: Element) {
    this.callback([{ isIntersecting: true, target } as IntersectionObserverEntry], this as unknown as IntersectionObserver)
  }

  disconnect() {}
  unobserve() {}
  takeRecords() { return [] }
}

describe('About i18n', () => {
  beforeAll(() => vi.stubGlobal('IntersectionObserver', IntersectionObserverMock))
  afterAll(() => vi.unstubAllGlobals())
  afterEach(() => setLocale('pt-BR', false))

  it('reactively translates the complete About content', async () => {
    setLocale('pt-BR', false)
    const wrapper = mountAbout()

    expect(wrapper.text()).toContain('Desenvolvedor Full Stack')
    expect(wrapper.text()).toContain('IdentidadeTécnica')
    expect(wrapper.find('.work-summary .terminal__title').attributes('aria-label')).toBe('O que eu faço exatamente?')
    expect(wrapper.text()).toContain('Onde meachar?')

    setLocale('en', false)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Full Stack Developer')
    expect(wrapper.text()).toContain('TechnicalIdentity')
    expect(wrapper.find('.work-summary .terminal__title').attributes('aria-label')).toBe('What exactly do I do?')
    expect(wrapper.text()).toContain('Where tofind me?')
    expect(wrapper.find('.work-summary .terminal__title').attributes('aria-label')).not.toBe('O que eu faço exatamente?')

    wrapper.unmount()
  })

  it('keeps CAPTCHA selection, reset, and completed states working in English', async () => {
    setLocale('en', false)
    const wrapper = mountAbout()
    const tiles = wrapper.findAll('.captcha__tile')

    await tiles[0]?.trigger('click')
    expect(wrapper.find('.captcha__progress').text()).toContain('SELECTED 1/09')
    expect(wrapper.find('.captcha__reset').text()).toContain('CLEAR')

    await wrapper.find('.captcha__reset').trigger('click')
    expect(wrapper.find('.captcha__progress').text()).toContain('SELECTED 0/09')

    for (const tile of tiles) await tile.trigger('click')
    expect(wrapper.find('.captcha__progress').text()).toContain('IDENTITY_VERIFIED')
    expect(wrapper.find('.captcha__reset').text()).toContain('RESTART')

    wrapper.unmount()
  })
})
