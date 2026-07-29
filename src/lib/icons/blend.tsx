import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Blend — the two circles actually blend. They drift toward each other
 * along their shared diagonal, deepening the overlap for a beat, then
 * settle back to exactly the lens Lucide drew — the boolean read as a
 * breath, not a permanent merge.
 * Base geometry: Lucide `blend` (ISC).
 */
const DUR = 1.0

export function BlendIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'blend'}
      {...hoverProps}
    >
      <motion.circle
        r="7"
        initial="normal"
        animate={controls}
        variants={{
          normal: { cx: 9, cy: 9 },
          animate: {
            cx: [9, 9.9, 9],
            cy: [9, 9.9, 9],
            transition: { duration: DUR, times: [0, 0.55, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.circle
        r="7"
        initial="normal"
        animate={controls}
        variants={{
          normal: { cx: 15, cy: 15 },
          animate: {
            cx: [15, 14.1, 15],
            cy: [15, 14.1, 15],
            transition: { duration: DUR, times: [0, 0.55, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'blend',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['boolean', 'layers', 'combine', 'blend'],
}

export default BlendIcon
