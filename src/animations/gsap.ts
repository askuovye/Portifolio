import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Plugins GSAP are registered here once. The guard keeps non-browser test
// environments (which do not implement matchMedia) from initializing it.
if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }
