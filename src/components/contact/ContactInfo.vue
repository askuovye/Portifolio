<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { motion } from 'motion-v'
import { useEnterMotion } from '@/composables/useEnterMotion'

interface ContactChannel {
  id: string
  label: string
  href: string
  external: boolean
  icon: string
}

const channels: ContactChannel[] = [
  { id: 'email', label: 'Email', href: 'mailto:john.lopes.fortes@gmail.com', external: false, icon: 'mdi:email-outline' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/askuovye', external: true, icon: 'mdi:github' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/joaolopesfortes/', external: true, icon: 'mdi:linkedin' },
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/+5542984431307', external: true, icon: 'mdi:whatsapp' },
]

const { enter } = useEnterMotion(.44)
</script>

<template>
  <div class="contact-info">
    <h2 id="contact-channels-title" class="sr-only">Canais de contato</h2>
    <ol aria-labelledby="contact-channels-title">
      <motion.li
        v-for="(channel, index) in channels"
        :key="channel.id"
        v-bind="enter(.46 + index * .06)"
      >
        <a
          :href="channel.href"
          :target="channel.external ? '_blank' : undefined"
          :rel="channel.external ? 'noopener noreferrer' : undefined"
        >
          <span class="contact-info__index">{{ String(index + 1).padStart(2, '0') }} /</span>
          <span class="contact-info__label">
            <Icon :icon="channel.icon" aria-hidden="true" />
            {{ channel.label }}
          </span>
          <span class="contact-info__action">Abrir canal</span>
          <span class="contact-info__arrow" aria-hidden="true">→</span>
        </a>
      </motion.li>
    </ol>
  </div>
</template>

<style scoped lang="scss">
.contact-info { margin-top: 0; }

.contact-info > h2 {
  margin: 0;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: .68rem;
  font-weight: 400;
  letter-spacing: .12em;
  line-height: 1.4;
  text-transform: uppercase;
}

.contact-info > h2 span,
.contact-info__index,
.contact-info__arrow { color: var(--accent-bright); }

.contact-info ol {
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--border);
  list-style: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  border: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}

.contact-info li {
  border-bottom: 1px solid var(--border);
  transition: border-color 180ms ease;
}

.contact-info a {
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr) auto auto;
  gap: .8rem;
  align-items: center;
  min-height: 4.15rem;
  padding: .75rem .15rem;
  color: var(--text-primary);
  font-size: clamp(.82rem, .9vw, .9rem);
  letter-spacing: .06em;
  text-transform: uppercase;
}

.contact-info__label,
.contact-info__arrow,
.contact-info__action {
  transition: opacity 180ms ease, transform 180ms ease, color 180ms ease;
}

.contact-info__label {
  display: inline-flex;
  gap: .55rem;
  align-items: center;
}

.contact-info__label svg {
  flex: 0 0 auto;
  width: 1.15rem;
  height: 1.15rem;
  color: var(--accent-bright);
}

.contact-info__action {
  color: var(--text-secondary);
  font-size: .68rem;
  opacity: .45;
}

.contact-info__arrow { font-size: 1rem; }
.contact-info li:hover,
.contact-info li:focus-within { border-color: var(--text-secondary); }
.contact-info a:hover .contact-info__label,
.contact-info a:focus-visible .contact-info__label { transform: translateX(4px); }
.contact-info a:hover .contact-info__action,
.contact-info a:focus-visible .contact-info__action { opacity: 1; }
.contact-info a:hover .contact-info__arrow,
.contact-info a:focus-visible .contact-info__arrow { transform: translateX(3px); }

.contact-info a:focus-visible {
  outline: 1px solid var(--accent-bright);
  outline-offset: 4px;
}

@media (max-width: 40rem) {
  .contact-info a {
    grid-template-columns: 2.6rem minmax(0, 1fr) auto auto;
    gap: .5rem;
    min-height: 4.25rem;
    font-size: .72rem;
  }

  .contact-info__action { font-size: .58rem; }
}

@media (prefers-reduced-motion: reduce) {
  .contact-info li,
  .contact-info__label,
  .contact-info__arrow,
  .contact-info__action { transition: none; }
}
</style>
