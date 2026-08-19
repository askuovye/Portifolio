<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'

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
      <p>// CONTACT_DIRECTORY</p>
      <h2 id="contact-links-title">Onde me<br><span>achar?</span></h2>
      <p class="contact-links__intro">Aberto a projetos, colaborações e boas conversas sobre tecnologia.</p>
    </div>

    <ol class="contact-links__list">
      <li v-for="(link, index) in links" :key="link.label">
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
      </li>
    </ol>
  </section>
</template>

<style scoped lang="scss">
.contact-links {
  display: grid;
  grid-template-columns: minmax(17rem, .8fr) minmax(22rem, 1.2fr);
  gap: clamp(3rem, 9vw, 9rem);
  padding: clamp(3rem, 7vw, 7rem) clamp(1rem, 5vw, 5rem);
  border: 1px solid var(--border);
  background: var(--surface);
}

.contact-links__heading > p:first-child { margin: 0 0 3.25rem; color: var(--accent-bright); font-family: var(--font-mono); font-size: .68rem; letter-spacing: .12em; }
h2 { margin: 0; font-family: var(--font-display); font-size: clamp(4rem, 8vw, 8rem); font-weight: 400; line-height: .72; text-transform: uppercase; }
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
}
</style>
