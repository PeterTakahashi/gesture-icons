import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Chevrons down — they descend in turn, mirror of chevrons-up.tsx. Both
 * nudge down and settle back on the same clock, top one leading, the lower
 * one starting 8% into the beat.
 * Base geometry: Lucide `chevrons-down` (ISC).
 */
const DUR = 0.9

export function ChevronsDownIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chevrons down'}
      {...hoverProps}
    >
      <motion.path
        d="m7 6 5 5 5-5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 2, 0],
            transition: { duration: DUR, times: [0, 0.35, 1], ease: [easeOutQuart, settleBack] },
          },
        }}
      />
      <motion.path
        d="m7 13 5 5 5-5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 2, 0],
            transition: { duration: DUR, times: [0, 0.08, 0.43, 1], ease: ['linear', easeOutQuart, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'chevrons-down',
  gesture: 'they descend in turn',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['down', 'double'],
}

export default ChevronsDownIcon
