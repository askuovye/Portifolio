import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ContactView from '@/views/ContactView.vue'
import { i18n, setLocale } from '@/i18n'

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

describe('Contact i18n', () => {
  beforeAll(() => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined)
  })
  afterAll(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })
  afterEach(() => setLocale('pt-BR', false))

  it('translates Contact reactively and preserves channel URLs', async () => {
    setLocale('pt-BR', false)
    const wrapper = mount(ContactView, { global: { plugins: [i18n] } })
    const expectedHrefs = [
      'mailto:john.lopes.fortes@gmail.com',
      'https://github.com/askuovye',
      'https://www.linkedin.com/in/joaolopesfortes/',
      'https://wa.me/+5542984431307',
    ]

    expect(wrapper.text()).toContain('Vamosconversar.')
    expect(wrapper.findAll('.contact-info a').map(link => link.attributes('href'))).toEqual(expectedHrefs)

    setLocale('en', false)
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Let’stalk.')
    expect(wrapper.text()).toContain('Open channel')
    expect(wrapper.text()).not.toContain('Abrir canal')
    expect(wrapper.findAll('.contact-info a').map(link => link.attributes('href'))).toEqual(expectedHrefs)

    wrapper.unmount()
  })
})
