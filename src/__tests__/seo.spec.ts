import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { setLocale } from '@/i18n'
import { setupSeoMetadata } from '@/seo'

const component = { template: '<div />' }
const createTestRouter = () => createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component },
    { path: '/about', name: 'about', component },
    { path: '/projects', name: 'projects', component },
    { path: '/experiences', name: 'experiences', component },
    { path: '/contact', name: 'contact', component },
    { path: '/:pathMatch(.*)*', name: 'not-found', component },
  ],
})

const metaContent = (selector: string) => document.head.querySelector<HTMLMetaElement>(selector)?.content

describe('SEO metadata', () => {
  afterEach(() => setLocale('pt-BR', false))

  it('reacts to route and locale changes and sets a runtime canonical', async () => {
    setLocale('pt-BR', false)
    const router = createTestRouter()
    await router.push('/')
    const stop = setupSeoMetadata(router)

    expect(document.title).toBe('João Fortes | Desenvolvedor Full Stack')
    expect(metaContent('meta[name="description"]')).toContain('Laravel, Vue.js')
    expect(metaContent('meta[property="og:type"]')).toBe('website')
    expect(metaContent('meta[property="og:locale"]')).toBe('pt_BR')
    expect(metaContent('meta[name="twitter:card"]')).toBe('summary_large_image')
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(`${window.location.origin}/`)

    setLocale('en', false)
    await nextTick()
    expect(document.title).toBe('João Fortes | Full Stack Developer')
    expect(metaContent('meta[property="og:locale"]')).toBe('en_US')
    expect(metaContent('meta[name="twitter:title"]')).toBe(document.title)

    await router.push('/projects')
    expect(document.title).toBe('Projects | João Fortes')
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(`${window.location.origin}/projects`)

    await router.push('/contact')
    expect(document.title).toBe('Contact | João Fortes')

    await router.push('/missing-page')
    expect(document.title).toBe('Page Not Found | João Fortes')
    expect(metaContent('meta[name="description"]')).toContain('could not be found')
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(`${window.location.origin}/missing-page`)

    stop()
  })
})
