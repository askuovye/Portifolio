import { afterEach, describe, expect, it } from 'vitest'
import { i18n, LOCALE_STORAGE_KEY, resolveInitialLocale, setLocale } from '../i18n'

describe('i18n', () => {
  afterEach(() => {
    window.localStorage.clear()
    setLocale('pt-BR', false)
  })

  it('prioritizes a saved supported locale', () => {
    expect(resolveInitialLocale('en', ['pt-BR'])).toBe('en')
    expect(resolveInitialLocale('pt-BR', ['en-US'])).toBe('pt-BR')
  })

  it('maps Portuguese browser languages to pt-BR and others to en', () => {
    expect(resolveInitialLocale(null, ['pt-PT', 'en-US'])).toBe('pt-BR')
    expect(resolveInitialLocale(null, ['en-US'])).toBe('en')
  })

  it('persists manual changes and synchronizes the document language', () => {
    setLocale('en')

    expect(i18n.global.locale.value).toBe('en')
    expect(window.localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })
})
