import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Navigation — it sets off. The pointer draws back opposite its own
 * heading (the arrow's tip points up-right, so the pull is down-left),
 * then lunges toward that heading with a small overshoot baked into the
 * curve, and returns — a compass needle committing to a direction.
 * Base geometry: Lucide `navigation` (ISC).
 */
const DUR = 0.95

export function NavigationIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'navigation'}
      {...hoverProps}
    >
      <motion.polygon
        points="3 11 22 2 13 21 11 13 3 11"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1.5, 2.5, 0],
            y: [0, 1.5, -2.5, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.64, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'navigation',
  gesture: 'it sets off',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['gps', 'direction', 'arrow', 'locate'],
}

export default NavigationIcon
