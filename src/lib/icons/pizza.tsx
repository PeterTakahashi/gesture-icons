import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Pizza — a slice is offered. The whole slice nudges along the axis its
 * point already aims — down toward the tip — and back, the topping dots
 * riding along as one piece: offered, then kept.
 * Base geometry: Lucide `pizza` (ISC).
 */
const DUR = 0.8

export function PizzaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pizza'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.35, -1.3, 0],
            y: [0, -0.4, 1.55, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m12 14-1 1" />
        <path d="m13.75 18.25-1.25 1.42" />
        <path d="M17.775 5.654a15.68 15.68 0 0 0-12.121 12.12" />
        <path d="M18.8 9.3a1 1 0 0 0 2.1 7.7" />
        <path d="M21.964 20.732a1 1 0 0 1-1.232 1.232l-18-5a1 1 0 0 1-.695-1.232A19.68 19.68 0 0 1 15.732 2.037a1 1 0 0 1 1.232.695z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'pizza',
  gesture: 'a slice is offered',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['food', 'italian'],
}

export default PizzaIcon
