<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { AnimatePresence, motion, useReducedMotion } from 'motion-v'
import { interactionSpring, reducedMotionTransition } from '@/animations/motion'
import PageLoader from '@/components/ui/PageLoader.vue'
import { usePageLoader } from '@/composables/usePageLoader'
import { setLocale, type SupportedLocale } from '@/i18n'

interface NavigationItem {
  labelKey: string
  to: string
}

const navigation: NavigationItem[] = [
  { labelKey: 'navigation.home', to: '/' },
  { labelKey: 'navigation.about', to: '/about' },
  { labelKey: 'navigation.projects', to: '/projects' },
  { labelKey: 'navigation.experiences', to: '/experiences' },
  { labelKey: 'navigation.contact', to: '/contact' },
]

const route = useRoute()
const { locale, t } = useI18n()
const isMenuOpen = ref(false)
const prefersReducedMotion = useReducedMotion()
const pageLoader = usePageLoader()

const closeMenu = () => {
  isMenuOpen.value = false
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const changeLocale = (nextLocale: SupportedLocale) => {
  setLocale(nextLocale)
}

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeMenu()
}

const waitForCriticalAssets = async (runId: number) => {
  await nextTick()
  await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()))
  pageLoader.setProgress(38, 'LOADING_FONTS')

  if ('fonts' in document) {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => window.setTimeout(resolve, 1200)),
    ])
  }

  pageLoader.setProgress(68, 'LOADING_VISIBLE_ASSETS')
  const visibleImages = [...document.querySelectorAll<HTMLImageElement>('main img')]
    .filter((image) => image.loading !== 'lazy' && image.getBoundingClientRect().top < window.innerHeight * 1.25)

  await Promise.allSettled(visibleImages.map(async (image) => {
    if (!image.complete) {
      await new Promise<void>((resolve) => {
        image.addEventListener('load', () => resolve(), { once: true })
        image.addEventListener('error', () => resolve(), { once: true })
      })
    }
    await image.decode?.().catch(() => undefined)
  }))

  pageLoader.setProgress(94, 'RENDERING_PAGE')
  pageLoader.finish(runId)
}

watch(() => route.fullPath, (path) => {
  closeMenu()
  const routeName = String(route.name ?? (path.replace(/\//g, '') || 'HOME'))
  const runId = pageLoader.start(routeName)
  void waitForCriticalAssets(runId)
}, { immediate: true })
onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', handleEscape))
</script>

<template>
  <PageLoader />
  <a class="skip-link" href="#main-content">{{ t('accessibility.skipToContent') }}</a>

  <div class="site-shell">
    <header class="site-header">
      <RouterLink class="site-logo" to="/" :aria-label="t('accessibility.homeLink')">
        <span aria-hidden="true">//</span> JOAO.DEV
      </RouterLink>

      <nav class="desktop-nav" :aria-label="t('accessibility.primaryNavigation')">
        <motion.div
          v-for="item in navigation"
          :key="item.to"
          class="desktop-nav__item"
          :while-hover="prefersReducedMotion ? undefined : { y: -2 }"
          :while-press="prefersReducedMotion ? undefined : { y: 1 }"
          :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
        >
          <RouterLink :to="item.to">{{ t(item.labelKey) }}</RouterLink>
        </motion.div>
      </nav>

      <div class="language-switcher" role="group" :aria-label="t('language.label')">
        <button type="button" :aria-pressed="locale === 'pt-BR'" @click="changeLocale('pt-BR')">PT</button>
        <span aria-hidden="true">/</span>
        <button type="button" :aria-pressed="locale === 'en'" @click="changeLocale('en')">EN</button>
      </div>

      <motion.button
        class="menu-trigger"
        type="button"
        aria-controls="mobile-navigation"
        :aria-expanded="isMenuOpen"
        :aria-label="isMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')"
        :while-hover="prefersReducedMotion ? undefined : { scale: 1.04 }"
        :while-press="prefersReducedMotion ? undefined : { scale: 0.96 }"
        :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
        @click="toggleMenu"
      >
        [ {{ isMenuOpen ? t('menu.close') : t('menu.open') }} ]
      </motion.button>

      <AnimatePresence>
        <motion.nav
          v-if="isMenuOpen"
          id="mobile-navigation"
          class="mobile-nav"
          :aria-label="t('accessibility.mobileNavigation')"
          :initial="prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }"
          :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
        >
          <motion.div
            v-for="item in navigation"
            :key="item.to"
            class="mobile-nav__item"
            :while-hover="prefersReducedMotion ? undefined : { x: 5 }"
            :while-press="prefersReducedMotion ? undefined : { x: 2 }"
            :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
          >
            <RouterLink :to="item.to" @click="closeMenu">{{ t(item.labelKey) }}</RouterLink>
          </motion.div>
        </motion.nav>
      </AnimatePresence>
    </header>

    <main id="main-content" class="site-container" tabindex="-1">
      <RouterView />
    </main>

    <footer class="site-footer site-container">
      <span>&gt; BUILDING IDEAS_</span>
      <span>© {{ new Date().getFullYear() }} JOAO.DEV</span>
    </footer>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.site-shell {
  min-height: 100dvh;
  overflow: clip;
}

.site-header {
  position: sticky;
  z-index: $z-header;
  top: 0;
  display: grid;
  grid-template-columns: minmax(12rem, 0.8fr) minmax(0, 2fr) auto;
  width: min(calc(100% - (2 * var(--site-gutter))), $container-max);
  margin-inline: auto;
  border: 1px solid var(--border);
  background: rgb(3 3 3 / 96%);
}

.language-switcher {
  display: flex;
  align-items: center;
  min-height: 3.5rem;
  padding-inline: .85rem;
  border-left: 1px solid var(--border);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: .68rem;
}

.language-switcher button {
  min-width: 2rem;
  min-height: 2rem;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.language-switcher button:hover,
.language-switcher button[aria-pressed='true'] {
  color: var(--accent-bright);
}

.site-logo {
  display: flex;
  align-items: center;
  min-height: 3.5rem;
  padding-inline: 1.25rem;
  border-right: 1px solid var(--border);
  color: var(--text-primary);
  font-family: var(--font-mono);
  font-size: clamp(1rem, 2vw, 1.35rem);
  font-weight: 700;
  letter-spacing: -0.05em;

  span {
    margin-right: 0.25rem;
    color: var(--accent-bright);
  }
}

.desktop-nav {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.desktop-nav__item {
  border-left: 1px solid var(--border);

  &:first-child {
    border-left: 0;
  }

  a {
    display: grid;
    min-height: 3.5rem;
    place-items: center;
    padding: 0.75rem 0.5rem;
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 0.78rem;
    text-transform: uppercase;
  }

  a:hover,
  a.router-link-exact-active {
    background: var(--surface-secondary);
    color: var(--accent-bright);
  }
}

.menu-trigger,
.mobile-nav {
  display: none;
}

.site-footer {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
  padding-block: 1.25rem;
  border-top: 1px solid var(--border);
  background: var(--background);
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.08em;
}

@include breakpoint-down($breakpoint-tablet) {
  .site-header {
    grid-template-columns: 1fr auto auto;
  }

  .desktop-nav {
    display: none;
  }

  .menu-trigger {
    display: block;
    min-width: 7rem;
    border: 0;
    border-left: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-primary);
    font-family: var(--font-mono);
    cursor: pointer;
  }

  .mobile-nav {
    position: absolute;
    top: calc(100% + 1px);
    right: -1px;
    left: -1px;
    display: block;
    border: 1px solid var(--border);
    background: var(--background);
  }

  .mobile-nav__item {
    border-bottom: 1px solid var(--border);

    &:last-child {
      border-bottom: 0;
    }

    a {
      display: block;
      padding: 1rem 1.25rem;
      color: var(--text-primary);
      font-family: var(--font-mono);
      font-size: 0.85rem;
      text-transform: uppercase;
    }

    a:hover,
    a.router-link-exact-active {
      background: var(--accent);
      color: white;
    }
  }
}

@include breakpoint-down($breakpoint-mobile) {
  .site-logo {
    min-height: 3.25rem;
    padding-inline: 0.8rem;
  }

  .language-switcher {
    min-height: 3.25rem;
    padding-inline: .35rem;
  }

  .language-switcher button {
    min-width: 1.75rem;
  }

  .site-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.65rem;
  }
}
</style>
