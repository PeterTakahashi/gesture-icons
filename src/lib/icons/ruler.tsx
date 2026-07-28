import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart } from '../core/easings'

/**
 * Ruler — it slides along its own long axis, ticks riding with it, as
 * if measuring off a length, then eases back home.
 * Base geometry: Lucide `ruler` (ISC).
 */
const DUR = 0.9

export function RulerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ruler'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1.6, 1.6, 0],
            y: [0, 1.6, 1.6, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.65, 1], ease: [easeOutQuart, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
        <path d="m14.5 12.5 2-2" />
        <path d="m11.5 9.5 2-2" />
        <path d="m8.5 6.5 2-2" />
        <path d="m17.5 15.5 2-2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'ruler',
  gesture: 'it takes a measure',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['measure', 'length'],
}

export default RulerIcon
