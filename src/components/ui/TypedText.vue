<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useReducedMotion } from 'motion-v'

const props = withDefaults(defineProps<{
  text: string
  tag?: string
  delay?: number
  speed?: number
}>(), {
  tag: 'span',
  delay: 0,
  speed: 24,
})

const root = ref<HTMLElement | null>(null)
const visibleText = ref('')
const prefersReducedMotion = useReducedMotion()
let observer: IntersectionObserver | undefined
let delayTimer: number | undefined
let typingTimer: number | undefined
let hasStarted = false

const revealImmediately = () => {
  visibleText.value = props.text
  hasStarted = true
}

const startTyping = () => {
  if (hasStarted) return
  hasStarted = true

  if (prefersReducedMotion.value) {
    revealImmediately()
    return
  }

  delayTimer = window.setTimeout(() => {
    let index = 0
    typingTimer = window.setInterval(() => {
      index += 1
      visibleText.value = props.text.slice(0, index)
      if (index >= props.text.length) window.clearInterval(typingTimer)
    }, props.speed)
  }, props.delay)
}

onMounted(() => {
  if (typeof window.IntersectionObserver !== 'function') {
    revealImmediately()
    return
  }

  observer = new IntersectionObserver(([entry]) => {
    if (!entry?.isIntersecting) return
    startTyping()
    observer?.disconnect()
  }, { threshold: 0.2 })
  if (root.value) observer.observe(root.value)
})

watch(() => props.text, (text) => {
  if (!hasStarted) return
  window.clearTimeout(delayTimer)
  window.clearInterval(typingTimer)
  visibleText.value = text
})

onBeforeUnmount(() => {
  observer?.disconnect()
  window.clearTimeout(delayTimer)
  window.clearInterval(typingTimer)
})
</script>

<template>
  <component :is="tag" ref="root" :aria-label="text">
    <span aria-hidden="true">{{ visibleText }}</span><i v-if="visibleText.length < text.length" class="typed-caret" aria-hidden="true">_</i>
  </component>
</template>

<style scoped>
.typed-caret { font-style: normal; animation: typed-caret-blink 650ms steps(1) infinite; }
@keyframes typed-caret-blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .typed-caret { animation: none; } }
</style>
