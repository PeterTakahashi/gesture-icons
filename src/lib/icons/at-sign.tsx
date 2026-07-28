import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * At sign — it addresses itself. The spiral un-draws from its tail, holds
 * gone for a beat, then a single pen stroke writes it back on. The inner
 * circle is the anchor and never moves.
 * Base geometry: Lucide `at-sign` (ISC).
 */
const DUR = 1.15

export function AtSignIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'at sign'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="4" />
      <motion.path
        d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.28, 0.42, 0.95], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'at-sign',
  gesture: 'it addresses itself',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['email', 'mention', 'handle'],
}

export default AtSignIcon
