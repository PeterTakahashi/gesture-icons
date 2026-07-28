import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Brackets — the array opens. Each bracket NUDGEs away from the other — a
 * small wind-up inward, a drive outward, a settle back home — making room
 * for elements. Mirror of braces.tsx's closing beat, run in lockstep since
 * opening is a single decisive motion, not a stagger.
 * Base geometry: Lucide `brackets` (ISC).
 */
const DUR = 0.8

export function BracketsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'brackets'}
      {...hoverProps}
    >
      <motion.path
        d="M16 3h3a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M8 21H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.3, -1.2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'brackets',
  gesture: 'the array opens',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['code', 'array'],
}

export default BracketsIcon
