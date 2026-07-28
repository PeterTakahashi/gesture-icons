import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Chevrons up — they climb in turn. Both nudge up and settle back on the
 * same clock, but the lower one starts 8% into the beat — a two-step climb
 * rather than one rigid block.
 * Base geometry: Lucide `chevrons-up` (ISC).
 */
const DUR = 0.9

export function ChevronsUpIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chevrons up'}
      {...hoverProps}
    >
      <motion.path
        d="m17 11-5-5-5 5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2, 0],
            transition: { duration: DUR, times: [0, 0.35, 1], ease: [easeOutQuart, settleBack] },
          },
        }}
      />
      <motion.path
        d="m17 18-5-5-5 5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, -2, 0],
            transition: { duration: DUR, times: [0, 0.08, 0.43, 1], ease: ['linear', easeOutQuart, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'chevrons-up',
  gesture: 'they climb in turn',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['up', 'double'],
}

export default ChevronsUpIcon
