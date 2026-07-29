import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Chevron first — the chevron nudges toward the bar it means to reach: a
 * small wind-up away, then the drive left toward the edge stop. The bar
 * takes a 1-unit contact nudge exactly on the frame the chevron arrives,
 * then both settle home.
 * Base geometry: Lucide `chevron-first` (ISC).
 */
const DUR = 0.85

export function ChevronFirstIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chevron first'}
      {...hoverProps}
    >
      <motion.path
        d="m17 18-6-6 6-6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.7, -2.3, -2.3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.55, 0.72, 1], ease: [easeInOutCubic, easeOutQuart, 'linear', easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M7 6v12"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, -1, 0],
            transition: { duration: DUR, times: [0, 0.55, 0.7, 0.9], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'chevron-first',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['navigate', 'step', 'chevron', 'first'],
}

export default ChevronFirstIcon
