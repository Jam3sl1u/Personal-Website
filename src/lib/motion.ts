import type { Variants } from 'motion/react'

/** One easing curve for the whole site keeps motion feeling consistent. */
export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease } },
}

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})

/** Word that rises out of a clipped line. Pair with an overflow-hidden parent. */
export const riseWord: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.9, ease } },
}

export const viewportOnce = { once: true, margin: '0px 0px -12% 0px' } as const
