import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Plugins GSAP are registered here once. Components import this configured instance.
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
