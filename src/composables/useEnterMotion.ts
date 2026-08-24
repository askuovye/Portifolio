import { useReducedMotion } from 'motion-v'

export function useEnterMotion(duration = 0.42) {
  const prefersReducedMotion = useReducedMotion()

  const enter = (delay: number, extra: Record<string, number | string> = {}) => ({
    initial: prefersReducedMotion.value ? { opacity: 0 } : { opacity: 0, y: 16, ...extra },
    whileInView: { opacity: 1, y: 0, clipPath: 'none', scale: 1, rotate: 0 },
    inViewOptions: { once: true, amount: 0.2 },
    transition: {
      duration: prefersReducedMotion.value ? 0.01 : duration,
      delay: prefersReducedMotion.value ? 0 : delay,
      ease: [0.22, 1, 0.36, 1],
    },
  })

  return { enter }
}
