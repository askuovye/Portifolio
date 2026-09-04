<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@iconify/vue'
import { motion, useReducedMotion } from 'motion-v'
import RetroButton from '@/components/ui/RetroButton.vue'
import RetroWindow from '@/components/ui/RetroWindow.vue'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { gsap } from '@/animations/gsap'
import { interactionSpring, reducedMotionTransition } from '@/animations/motion'
import { useGsapContext } from '@/composables/useGsapContext'
import { useDecorativeVideo } from '@/composables/useDecorativeVideo'
import worldVideo from '@/assets/animations/world.mp4'

interface ContactChannel {
  label: string
  detail: string
  icon: string
  href: string
}

const isExternalLink = (href: string) => /^https?:\/\//i.test(href)
const { t } = useI18n()

const channels = computed<ContactChannel[]>(() => [
  { label: 'Email', detail: 'john.lopes.fortes@gmail.com', icon: 'mdi:email-outline', href: 'mailto:john.lopes.fortes@gmail.com' },
  { label: 'LinkedIn', detail: t('home.contact.channels.linkedin'), icon: 'mdi:linkedin', href: 'https://www.linkedin.com/in/joaolopesfortes/' },
  { label: 'GitHub', detail: t('home.contact.channels.github'), icon: 'mdi:github', href: 'https://github.com/askuovye' },
  { label: 'WhatsApp', detail: '42984431307', icon: 'mdi:whatsapp', href: 'https://wa.me/+5542984431307' },
])

const section = ref<HTMLElement | null>(null)
const prefersReducedMotion = useReducedMotion()
const worldPlayer = ref<HTMLVideoElement | null>(null)
const isDesktop = ref(false)
let desktopMedia: MediaQueryList | undefined
useDecorativeVideo(worldPlayer, { target: section, enabled: isDesktop, threshold: .08 })

const updateDesktop = () => {
  isDesktop.value = Boolean(desktopMedia?.matches)
}

onMounted(() => {
  if (typeof window.matchMedia !== 'function' || typeof window.IntersectionObserver !== 'function') return
  desktopMedia = window.matchMedia('(min-width: 38.0625rem)')
  desktopMedia.addEventListener('change', updateDesktop)
  updateDesktop()
})

onBeforeUnmount(() => {
  desktopMedia?.removeEventListener('change', updateDesktop)
})

useGsapContext(section, ({ reducedMotion }) => {
  const heading = section.value?.querySelector('.contact__heading')
  const window = section.value?.querySelector('.contact__window')
  const channels = section.value?.querySelectorAll('.contact-channel')

  if (!heading || !window || !channels?.length) return

  if (reducedMotion) {
    gsap.set([heading, window, ...channels], { clearProps: 'clipPath,opacity,transform' })
    return
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: section.value,
      start: 'top 78%',
      toggleActions: 'play none none reverse',
    },
  })
    .from(heading, {
      y: 22,
      opacity: 0,
      duration: 0.48,
      ease: 'power3.out',
    })
    .from(window, {
      clipPath: 'inset(0 0 100% 0)',
      y: 28,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
      clearProps: 'clipPath',
    }, '-=0.18')
    .from(channels, {
      x: 18,
      opacity: 0,
      duration: 0.32,
      stagger: 0.08,
      ease: 'power3.out',
    }, '-=0.48')
})
</script>

<template>
  <section ref="section" class="contact" aria-labelledby="contact-title">
    <div class="contact__heading">
      <div>
        <SectionTitle id="contact-title" :level="2">{{ t('home.contact.title') }}</SectionTitle>
      </div>
      <div class="contact__status" role="status">
        <span aria-hidden="true" />
        {{ t('home.contact.availability') }}
      </div>
    </div>

    <div class="contact__layout">
      <RetroWindow class="contact__window" title="new_message.exe" :close-label="t('home.contact.windowLabel')">
        <div class="contact__message">
          <p class="contact__prompt" aria-hidden="true">C:\JOAO\CONTACT&gt; <span>_</span></p>
          <h4>{{ t('home.contact.heading') }}</h4>
          <p class="contact__copy">{{ t('home.contact.description') }}</p>

          <div class="contact__meta">
            <span><Icon icon="mdi:map-marker-outline" aria-hidden="true" /> Pato Branco, PR</span>
            <span><Icon icon="mdi:clock-outline" aria-hidden="true" /> GMT−3 · Brasília</span>
          </div>

          <p class="contact__channels-title">// {{ t('home.contact.channelsTitle') }}</p>
          <motion.a
            v-for="(channel, index) in channels"
            :key="channel.label"
            :href="channel.href"
            :target="isExternalLink(channel.href) ? '_blank' : undefined"
            :rel="isExternalLink(channel.href) ? 'noopener noreferrer' : undefined"
            class="contact-channel"
            :while-hover="prefersReducedMotion ? undefined : { x: 5 }"
            :transition="prefersReducedMotion ? reducedMotionTransition : interactionSpring"
          >
            <span class="contact-channel__number">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="contact-channel__icon" aria-hidden="true"><Icon :icon="channel.icon" /></span>
            <span class="contact-channel__text">
              <strong>{{ channel.label }}</strong>
              <small>{{ channel.detail }}</small>
            </span>
            <Icon class="contact-channel__arrow" icon="mdi:arrow-top-right" aria-hidden="true" />
          </motion.a>
        </div>
      </RetroWindow>

      <aside class="contact__channels" aria-hidden="true">
        <video
          v-if="isDesktop"
          ref="worldPlayer"
          class="contact__world decorative-video-edge-fade"
          :src="worldVideo"
          muted
          loop
          playsinline
          preload="metadata"
        />
      </aside>
    </div>

    <div class="contact__ticker" aria-hidden="true">
      <span>DESIGN + CODE + CREATE</span>
      <span>●</span>
      <span>{{ t('home.contact.ticker') }}</span>
      <span>●</span>
      <span>OPEN TO WORK</span>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.contact {
  position: relative;
  padding: var(--section-space) clamp(.75rem, 4vw, 4rem) 2rem;
  border-top: 0;
  background:
    radial-gradient(circle at 25% 45%, rgb(23 60 255 / 12%), transparent 28rem),
    var(--background);
}

.contact__heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  max-width: 75rem;
  margin: 0 auto clamp(2rem, 5vw, 3.5rem);
}

.contact__eyebrow,
.contact__channels-title {
  margin-bottom: .65rem;
  color: var(--accent-bright);
  font-size: .67rem;
  letter-spacing: .12em;
}

.contact__status {
  display: flex;
  align-items: center;
  gap: .55rem;
  max-width: 25rem;
  padding: .6rem .75rem;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  font-size: .68rem;
  line-height: 1.4;
  text-transform: uppercase;
}

.contact__status > span {
  flex: 0 0 auto;
  width: .55rem;
  height: .55rem;
  border-radius: 50%;
  background: var(--accent-bright);
  box-shadow: 0 0 10px var(--accent-bright);
  animation: status-pulse 1.8s ease-in-out infinite;
}

.contact__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(17rem, .65fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  align-items: center;
  max-width: 68rem;
  margin-inline: auto;
}

.contact__window { transform: rotate(1deg); width: 70%;}

.contact__message {
  padding: clamp(1.25rem, 4vw, 3rem);
  background:
    linear-gradient(rgb(255 255 255 / 2%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 2%) 1px, transparent 1px),
    #050505;
  background-size: 24px 24px;
}

.contact__prompt {
  margin-bottom: 1.25rem;
  color: var(--accent-bright);
  font-size: .72rem;
}

.contact__prompt span { animation: cursor-blink 1s steps(1) infinite; }

.contact__message h3 {
  max-width: 43rem;
  color: var(--text-primary);
  font-size: clamp(2rem, 5vw, 4.8rem);
  line-height: .95;
}

.contact__copy {
  max-width: 42rem;
  margin: 1.5rem 0;
  font-size: clamp(.78rem, 1.2vw, .95rem);
  line-height: 1.7;
}

.contact__meta {
  display: flex;
  flex-wrap: wrap;
  gap: .65rem 1.5rem;
  margin-bottom: 1.75rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border);
  color: #d2d2d2;
  font-size: .68rem;
  text-transform: uppercase;
}

.contact__meta span { display: inline-flex; align-items: center; gap: .4rem; }
.contact__meta svg { width: 1rem; height: 1rem; color: var(--accent-bright); }
.contact__channels {
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 22rem;
}

.contact__world {
  display: block;
  width: min(300%);
  height: auto;
  max-height: 28rem;
  object-fit: contain;
}

.contact-channel {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr) auto;
  gap: .8rem;
  align-items: center;
  padding: 1rem .25rem 1rem;
  border-top: 1px solid var(--border);
  color: inherit;
  text-decoration: none;
}
.contact-channel svg { width: 1rem; height: 1rem; color: var(--accent-bright); }

.contact-channel:last-child { border-bottom: 1px solid var(--border); }
.contact-channel__number { color: #666; font-size: .58rem; }

.contact-channel__icon {
  display: grid;
  width: 2.15rem;
  height: 2.15rem;
  place-items: center;
  border: 1px solid #777;
  color: var(--accent-bright);
  font-size: 1.15rem;
}

.contact-channel__text { display: flex; min-width: 0; flex-direction: column; }
.contact-channel__text strong { color: var(--text-primary); font-size: .75rem; text-transform: uppercase; }
.contact-channel__text small { overflow: hidden; color: var(--text-secondary); font-size: .62rem; text-overflow: ellipsis; white-space: nowrap; }
.contact-channel__arrow { color: #777; }

.contact__ticker {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: clamp(3rem, 7vw, 6rem);
  padding: 1rem 0 0;
  border-top: 1px solid var(--border);
  color: #777;
  font-size: clamp(.55rem, 1vw, .7rem);
  letter-spacing: .1em;
  white-space: nowrap;
}

.contact__ticker span:nth-child(even) { color: var(--accent-bright); }

@keyframes status-pulse {
  50% { opacity: .45; box-shadow: 0 0 3px var(--accent-bright); }
}

@include breakpoint-down($breakpoint-tablet) {
  .contact__layout { grid-template-columns: 1fr; }
  .contact__channels { max-width: none; }
}

@include breakpoint-down($breakpoint-mobile) {
  .contact__heading { align-items: stretch; flex-direction: column; }
  .contact__message { padding: 1.25rem; }
  .contact__message h3 { font-size: clamp(2.35rem, 14vw, 4rem); }
  .contact__meta { align-items: flex-start; flex-direction: column; }
  .contact__ticker { justify-content: center; }
  .contact__ticker span:nth-child(n + 3) { display: none; }
  .contact__channels { display: none; }
}
</style>
