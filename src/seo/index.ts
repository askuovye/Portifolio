import { watch, type WatchStopHandle } from 'vue'
import type { Router } from 'vue-router'
import { i18n, type SupportedLocale } from '@/i18n'

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

const setCanonical = (path: string) => {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.append(element)
  }
  element.href = new URL(path, window.location.origin).href
}

export const setupSeoMetadata = (router: Router): WatchStopHandle => watch(
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
    setMeta('property', 'og:locale', ogLocales[supportedLocale])
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setCanonical(route.path)
  },
  { immediate: true },
)
