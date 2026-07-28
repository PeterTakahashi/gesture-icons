import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Chevrons right — they wave right in turn. Both nudge right and settle
 * back on the same clock, the right one leading, the left one starting 8%
 * into the beat.
 * Base geometry: Lucide `chevrons-right` (ISC).
 */
const DUR = 0.9

export function ChevronsRightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chevrons right'}
      {...hoverProps}
    >
      <motion.path
        d="m6 17 5-5-5-5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 2, 0],
            transition: { duration: DUR, times: [0, 0.08, 0.43, 1], ease: ['linear', easeOutQuart, settleBack] },
          },
        }}
      />
      <motion.path
        d="m13 17 5-5-5-5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 2, 0],
            transition: { duration: DUR, times: [0, 0.35, 1], ease: [easeOutQuart, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'chevrons-right',
  gesture: 'they wave right in turn',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['right', 'double', 'fast-forward'],
}

export default ChevronsRightIcon
