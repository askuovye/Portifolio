import { watch } from 'vue'
import { createI18n } from 'vue-i18n'
import en from './locales/en'
import ptBR from './locales/pt-BR'

export const supportedLocales = ['pt-BR', 'en'] as const
export type SupportedLocale = typeof supportedLocales[number]

export const LOCALE_STORAGE_KEY = 'portfolio.locale'

const isSupportedLocale = (locale: string | null): locale is SupportedLocale =>
  supportedLocales.includes(locale as SupportedLocale)

export const resolveInitialLocale = (
  savedLocale: string | null,
  browserLanguages: readonly string[],
): SupportedLocale => {
  if (isSupportedLocale(savedLocale)) return savedLocale
  return browserLanguages.some(language => language.toLowerCase().startsWith('pt')) ? 'pt-BR' : 'en'
}

const readSavedLocale = () => {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(LOCALE_STORAGE_KEY)
  } catch {
    return null
  }
}

const readBrowserLanguages = () => {
  if (typeof navigator === 'undefined') return []
  return navigator.languages?.length ? navigator.languages : [navigator.language]
}

const initialLocale = resolveInitialLocale(readSavedLocale(), readBrowserLanguages())

export const i18n = createI18n({
  legacy: false,
  locale: initialLocale,
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
    en,
  },
})

const updateDocumentLanguage = (locale: SupportedLocale) => {
  if (typeof document !== 'undefined') document.documentElement.lang = locale
}

export const setLocale = (locale: SupportedLocale, persist = true) => {
  i18n.global.locale.value = locale
  updateDocumentLanguage(locale)
  if (!persist || typeof window === 'undefined') return
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {
    // The language still changes when storage is unavailable.
  }
}

updateDocumentLanguage(initialLocale)
watch(i18n.global.locale, locale => updateDocumentLanguage(locale as SupportedLocale))
