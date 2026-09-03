import { beforeEach, describe, it, expect } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../App.vue'
import { i18n, setLocale } from '../i18n'
import { routes } from '../router'

describe('App', () => {
  beforeEach(() => setLocale('pt-BR', false))
  it('renders the home route and navigation', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    await router.push('/')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, i18n],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Opa! João aqui.')
    expect(wrapper.findAll('nav a')).toHaveLength(5)
  })

  it('renders the not-found route inside the global layout', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    })

    await router.push('/rota-que-nao-existe')
    await router.isReady()

    const wrapper = mount(App, {
      global: {
        plugins: [router, i18n],
      },
    })

    await flushPromises()

    expect(wrapper.text()).toContain('Arquivo não encontrado.')
    expect(wrapper.get('a[href="/"]').text()).toContain('JOAO.DEV')
    expect(wrapper.get('.not-found__content a[href="/"]').text()).toContain('Voltar para Home')

    setLocale('en', false)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('File not found.')
    expect(wrapper.get('.not-found__content a[href="/"]').text()).toContain('Back to Home')
  })
})
