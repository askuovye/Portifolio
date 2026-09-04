import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { setLocale } from '@/i18n'
import { resolveSiteUrl, setupSeoMetadata } from '@/seo'

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
  afterEach(() => {
    setLocale('pt-BR', false)
    document.head.querySelector('link[rel="canonical"]')?.remove()
    document.head.querySelector('meta[property="og:url"]')?.remove()
  })

  it('keeps relative social images and omits URL tags without VITE_SITE_URL', async () => {
    document.head.innerHTML = '<meta property="og:image" content="/og-image.png"><meta name="twitter:image" content="/og-image.png">'
    const router = createTestRouter()
    await router.push('/')
    const stop = setupSeoMetadata(router, undefined)

    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull()
    expect(document.head.querySelector('meta[property="og:url"]')).toBeNull()
    expect(metaContent('meta[property="og:image"]')).toBe('/og-image.png')
    expect(metaContent('meta[name="twitter:image"]')).toBe('/og-image.png')
    expect(resolveSiteUrl(undefined)).toBeUndefined()
    expect(resolveSiteUrl('not-a-url')).toBeUndefined()

    stop()
  })

  it('creates absolute route and image metadata with a valid VITE_SITE_URL', async () => {
    setLocale('pt-BR', false)
    const router = createTestRouter()
    await router.push('/')
    const stop = setupSeoMetadata(router, 'https://portfolio.test')

    expect(document.title).toBe('João Fortes | Desenvolvedor Full Stack')
    expect(metaContent('meta[name="description"]')).toContain('Laravel, Vue.js')
    expect(metaContent('meta[property="og:type"]')).toBe('website')
    expect(metaContent('meta[property="og:locale"]')).toBe('pt_BR')
    expect(metaContent('meta[name="twitter:card"]')).toBe('summary_large_image')
    expect(metaContent('meta[property="og:image"]')).toBe('https://portfolio.test/og-image.png')
    expect(metaContent('meta[name="twitter:image"]')).toBe('https://portfolio.test/og-image.png')
    expect(metaContent('meta[property="og:url"]')).toBe('https://portfolio.test/')
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://portfolio.test/')

    setLocale('en', false)
    await nextTick()
    expect(document.title).toBe('João Fortes | Full Stack Developer')
    expect(metaContent('meta[property="og:locale"]')).toBe('en_US')
    expect(metaContent('meta[name="twitter:title"]')).toBe(document.title)

    await router.push('/projects')
    expect(document.title).toBe('Projects | João Fortes')
    expect(metaContent('meta[property="og:url"]')).toBe('https://portfolio.test/projects')
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://portfolio.test/projects')

    await router.push('/contact')
    expect(document.title).toBe('Contact | João Fortes')

    await router.push('/missing-page')
    expect(document.title).toBe('Page Not Found | João Fortes')
    expect(metaContent('meta[name="description"]')).toContain('could not be found')
    expect(document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe('https://portfolio.test/missing-page')

    stop()
  })
})
