<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { motion } from 'motion-v'
import { RouterLink } from 'vue-router'
import tamagochiVideo from '@/assets/animations/tamagochi.mp4'
import globeImage from '@/assets/elements/globe.jpg'
import { useEnterMotion } from '@/composables/useEnterMotion'

const { enter } = useEnterMotion()
const tamagochiPlayer = ref<HTMLVideoElement | null>(null)
const isDesktop = ref(false)
let tamagochiObserver: IntersectionObserver | undefined
let desktopMedia: MediaQueryList | undefined

const pauseTamagochi = () => tamagochiPlayer.value?.pause()

const observeTamagochi = async () => {
  tamagochiObserver?.disconnect()
  pauseTamagochi()
  if (!isDesktop.value) return

  await nextTick()
  if (!tamagochiPlayer.value) return

  tamagochiObserver = new IntersectionObserver(([entry]) => {
    if (!entry) return
    if (entry.isIntersecting) void tamagochiPlayer.value?.play().catch(() => undefined)
    else pauseTamagochi()
  }, { threshold: 0.15 })

  tamagochiObserver.observe(tamagochiPlayer.value)
}

const updateDesktop = () => {
  isDesktop.value = Boolean(desktopMedia?.matches)
}

watch(isDesktop, () => { void observeTamagochi() })

onMounted(() => {
  if (typeof window.matchMedia !== 'function' || typeof window.IntersectionObserver !== 'function') return
  desktopMedia = window.matchMedia('(min-width: 38.0625rem)')
  desktopMedia.addEventListener('change', updateDesktop)
  updateDesktop()
})

onBeforeUnmount(() => {
  tamagochiObserver?.disconnect()
  desktopMedia?.removeEventListener('change', updateDesktop)
  pauseTamagochi()
})

interface ContactLink {
  label: string
  detail: string
  icon: string
  href?: string
  to?: string
  available?: boolean
}

const links: ContactLink[] = [
  {
    label: 'LinkedIn',
    detail: 'Conexões profissionais',
    icon: 'mdi:linkedin',
    href: 'https://www.linkedin.com/in/joaolopesfortes/',
  },
  {
    label: 'GitHub',
    detail: 'Código e projetos',
    icon: 'mdi:github',
    href: 'https://github.com/askuovye',
  },
  {
    label: 'Email',
    detail: 'Mensagem direta',
    icon: 'mdi:email-outline',
    to: '/contact',
  },
  {
    label: 'WhatsApp',
    detail: 'Conversa rápida',
    icon: 'mdi:whatsapp',
    to: '/contact',
  },
  {
    label: 'Currículo',
    detail: 'Disponível em breve',
    icon: 'mdi:file-document-outline',
    available: false,
  },
]
</script>

<template>
  <section class="contact-links" aria-labelledby="contact-links-title">
    <div class="contact-links__heading">
      <motion.p v-bind="enter(0.05)">// CONTACT_DIRECTORY</motion.p>
      <motion.h2 id="contact-links-title" v-bind="enter(0.12)">Onde me<br><span>achar?</span></motion.h2>
      <motion.p class="contact-links__intro" v-bind="enter(0.2)">Aberto a projetos, colaborações e boas conversas sobre tecnologia.</motion.p>
    </div>

    <ol class="contact-links__list">
      <motion.li v-for="(link, index) in links" :key="link.label" v-bind="enter(0.08 + index * 0.06)">
        <component
          :is="link.available === false ? 'div' : (link.to ? RouterLink : 'a')"
          class="contact-link"
          :class="{ 'contact-link--disabled': link.available === false }"
          :to="link.to"
          :href="link.href"
          :target="link.href ? '_blank' : undefined"
          :rel="link.href ? 'noopener noreferrer' : undefined"
          :aria-disabled="link.available === false || undefined"
        >
          <span class="contact-link__number">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="contact-link__icon" aria-hidden="true"><Icon :icon="link.icon" /></span>
          <span class="contact-link__copy">
            <strong>{{ link.label }}</strong>
            <small>{{ link.detail }}</small>
          </span>
          <span class="contact-link__arrow" aria-hidden="true">{{ link.available === false ? '—' : '↗' }}</span>
        </component>
      </motion.li>
    </ol>

    <img class="contact-links__globe" :src="globeImage" alt="" aria-hidden="true">
    <video
      v-if="isDesktop"
      ref="tamagochiPlayer"
      class="contact-links__tamagochi"
      :src="tamagochiVideo"
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
    />
  </section>
</template>

<style scoped lang="scss">
.contact-links {
  position: relative;
  display: grid;
  grid-template-columns: minmax(17rem, .8fr) minmax(22rem, 1.2fr);
  gap: clamp(3rem, 9vw, 9rem);
  padding: clamp(3rem, 7vw, 7rem) clamp(1rem, 5vw, 5rem);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: visible;
}

.contact-links__heading,
.contact-links__list { position: relative; z-index: 1; }

.contact-links__globe {
  position: absolute;
  z-index: 2;
  right: clamp(-2rem, -2vw, -.75rem);
  bottom: clamp(-3rem, -3vw, -1.5rem);
  width: clamp(8rem, 14vw, 13rem);
  height: auto;
  mix-blend-mode: screen;
  transform: rotate(7deg);
  pointer-events: none;
  user-select: none;
}

.contact-links__tamagochi {
  position: absolute;
  z-index: 2;
  top: 17%;
  left: 40%;
  width: clamp(12rem, 27vw, 9rem);
  height: auto;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, rgb(0 0 0 / 80%) 48%, rgb(0 0 0 / 35%) 68%, transparent 88%);
  mask-image: radial-gradient(ellipse at center, #000 30%, rgb(0 0 0 / 80%) 48%, rgb(0 0 0 / 35%) 68%, transparent 88%);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.contact-links__heading > p:first-child { margin: 0 0 3.25rem; color: var(--accent-bright); font-family: var(--font-mono); font-size: .68rem; letter-spacing: .12em; }
h2 { margin: 0; font-family: var(--font-display); font-size: clamp(4rem, 8vw, 8rem); font-weight: 400; line-height: .82; text-transform: uppercase; }
h2 span { color: var(--accent-bright); }
.contact-links__intro { max-width: 28rem; margin: 2.5rem 0 0; color: var(--text-secondary); font-size: .86rem; line-height: 1.7; }
.contact-links__list { margin: 0; padding: 0; border-top: 1px solid var(--border); list-style: none; }
.contact-links__list li { border-bottom: 1px solid var(--border); }

.contact-link {
  display: grid;
  grid-template-columns: 2rem 2.5rem minmax(0, 1fr) auto;
  align-items: center;
  gap: 1rem;
  min-height: 5.25rem;
  padding: .8rem .5rem;
  color: inherit;
  text-decoration: none;
  transition: padding 180ms ease, background-color 180ms ease;
}

.contact-link:not(.contact-link--disabled):hover { padding-inline: 1rem; background: var(--background); }
.contact-link__number { color: #666; font-family: var(--font-mono); font-size: .62rem; }
.contact-link__icon { display: grid; width: 2.5rem; height: 2.5rem; place-items: center; border: 1px solid var(--border); color: var(--accent-bright); font-size: 1.25rem; }
.contact-link__copy { display: flex; min-width: 0; flex-direction: column; gap: .3rem; }
.contact-link__copy strong { color: var(--text-primary); font-family: var(--font-mono); font-size: .82rem; text-transform: uppercase; }
.contact-link__copy small { color: var(--text-secondary); font-size: .7rem; }
.contact-link__arrow { color: var(--accent-bright); font-size: 1.15rem; }
.contact-link--disabled { opacity: .42; }

@media (max-width: 48rem) {
  .contact-links { grid-template-columns: 1fr; }
}

@media (max-width: 38rem) {
  .contact-link { grid-template-columns: 1.5rem 2.5rem minmax(0, 1fr) auto; gap: .65rem; }
  .contact-links__globe { right: -.5rem; bottom: -2rem; width: 8rem; }
}
</style>
