import { watch, type WatchStopHandle } from 'vue'
import type { Router } from 'vue-router'
import { i18n, type SupportedLocale } from '@/i18n'

export const resolveSiteUrl = (value: string | undefined): string | undefined => {
  if (!value?.trim()) return undefined
  try {
    const url = new URL(value.trim())
    if (!['http:', 'https:'].includes(url.protocol)) return undefined
    return url.href.replace(/\/$/, '')
  } catch {
    return undefined
  }
}

const CANONICAL_SITE_URL = 'https://joaofortes.dev'
const SITE_URL = CANONICAL_SITE_URL

const routeKeys = {
  home: 'home',
  about: 'about',
  projects: 'projects',
  experiences: 'experiences',
  contact: 'contact',
  'not-found': 'notFound',
} as const

type RouteName = keyof typeof routeKeys

const ogLocales: Record<SupportedLocale, string> = {
  'pt-BR': 'pt_BR',
  en: 'en_US',
}

const setMeta = (attribute: 'name' | 'property', key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = content
}

const setCanonical = (url: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.append(element)
  }
  element.href = url
}

const removeElement = (selector: string) => document.head.querySelector(selector)?.remove()

export const setupSeoMetadata = (router: Router, configuredSiteUrl = SITE_URL): WatchStopHandle => watch(
  [router.currentRoute, i18n.global.locale],
  ([route, locale]) => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return
    const routeName = route.name as RouteName | undefined
    if (!routeName || !(routeName in routeKeys)) return

    const routeKey = routeKeys[routeName]
    const title = i18n.global.t(`seo.routes.${routeKey}.title`)
    const description = i18n.global.t(`seo.routes.${routeKey}.description`)
    const supportedLocale = locale as SupportedLocale

    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', 'João Fortes')
    setMeta('property', 'og:locale', ogLocales[supportedLocale])
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:type', 'image/jpeg')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    const isNotFound = routeName === 'not-found'
    setMeta('name', 'robots', isNotFound ? 'noindex,follow' : 'index,follow')

    const siteUrl = resolveSiteUrl(configuredSiteUrl)
    if (siteUrl) {
      const pageUrl = new URL(route.path, `${siteUrl}/`).href
      const imageUrl = new URL('/og-image.jpg', `${siteUrl}/`).href
      setMeta('property', 'og:image', imageUrl)
      setMeta('name', 'twitter:image', imageUrl)

      if (isNotFound) {
        removeElement('link[rel="canonical"]')
        removeElement('meta[property="og:url"]')
      } else {
        setCanonical(pageUrl)
        setMeta('property', 'og:url', pageUrl)
      }
    } else {
      removeElement('link[rel="canonical"]')
      removeElement('meta[property="og:url"]')
    }
  },
  { immediate: true },
)
