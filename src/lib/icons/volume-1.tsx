import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Volume 1 — it speaks softly. VARIANT(volume): the single small arc
 * erases and re-emits once, gently — a smaller flinch, a smaller wave,
 * because there is only one wave to give.
 * Base geometry: Lucide `volume-1` (ISC).
 */
const DUR = 0.85

export function Volume1Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'volume low'}
      {...hoverProps}
    >
      <motion.path
        d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.4, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.4], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M16 9a5 5 0 0 1 0 6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.7], ease: ['linear', 'linear', easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'volume-1',
  gesture: 'it speaks softly',
  family: 'draw-on' as const,
  section: 'Media',
  tags: ['audio', 'quiet', 'low'],
}

export default Volume1Icon
