import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

/**
 * A small ring that trails the pointer and grows over interactive elements.
 * Desktop pointers only, and never when the user prefers reduced motion.
 * The native cursor stays visible, so nothing depends on this.
 */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.5 })
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduce.matches) return
    setEnabled(true)

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = e.target instanceof Element ? e.target : null
      setHovering(Boolean(target?.closest('a, button, [role="tab"], [data-cursor]')))
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y])

  if (!enabled) return null

  return (
    <motion.div aria-hidden="true" className="no-print pointer-events-none fixed left-0 top-0 z-[100]" style={{ x: sx, y: sy }}>
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
        animate={{ width: hovering ? 46 : 12, height: hovering ? 46 : 12, opacity: hovering ? 0.9 : 0.45 }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      />
    </motion.div>
  )
}
