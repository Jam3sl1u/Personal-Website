import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, stagger, viewportOnce } from '../../lib/motion'

/** Fades children up when they scroll into view. */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

/** Parent that staggers any child using the `fadeUp` variants (see RevealItem). */
export function RevealGroup({
  children,
  className,
  step = 0.08,
}: {
  children: ReactNode
  className?: string
  step?: number
}) {
  return (
    <motion.div className={className} variants={stagger(step)} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}
