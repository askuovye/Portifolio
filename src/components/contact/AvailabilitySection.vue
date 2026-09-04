<script setup lang="ts">
import { motion } from 'motion-v'
import { useI18n } from 'vue-i18n'
import { useEnterMotion } from '@/composables/useEnterMotion'

const { enter } = useEnterMotion(.44)
const { t } = useI18n()
</script>

<template>
  <motion.div class="availability" v-bind="enter(.28)">
    <p class="availability__status"><span aria-hidden="true" /> {{ t('contact.availability.status') }}</p>
    <p>{{ t('contact.availability.location') }} / GMT−3</p>
    <p>{{ t('contact.availability.workMode') }}</p>
  </motion.div>
</template>

<style scoped lang="scss">
.availability {
  display: grid;
  grid-template-columns: .8fr 1fr 1.45fr;
  border: 1px solid var(--border);
  border-radius: .55rem;
}

.availability p {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 3.5rem;
  margin: 0;
  padding: .75rem 1rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  font-size: clamp(.68rem, .78vw, .76rem);
  letter-spacing: .025em;
  line-height: 1.35;
  text-align: center;
  text-transform: uppercase;
}

.availability p + p { border-left: 1px solid var(--border); }

.availability .availability__status {
  gap: .5rem;
  color: var(--text-secondary);
}

.availability__status span {
  flex: 0 0 auto;
  width: .45rem;
  height: .45rem;
  border-radius: 50%;
  background: var(--accent-bright);
  animation: availability-dot-pulse 1.8s ease-in-out infinite;
}

@keyframes availability-dot-pulse {
  0%, 100% {
    box-shadow: 0 0 0 rgb(49 87 255 / 0%);
    opacity: .72;
    transform: scale(1);
  }
  50% {
    box-shadow:
      0 0 .4rem rgb(225 231 255 / 100%),
      0 0 1.15rem rgb(125 149 255 / 100%),
      0 0 2.8rem rgb(49 87 255 / 82%);
    opacity: 1;
    transform: scale(1.24);
  }
}

@media (max-width: 40rem) {
  .availability {
    grid-template-columns: 1fr;
  }

  .availability p { min-height: 3rem; }
  .availability p + p { border-top: 1px solid var(--border); border-left: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .availability__status span { animation: none; }
}
</style>
