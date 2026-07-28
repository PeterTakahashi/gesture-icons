import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutExpo, easeOutQuart } from '../core/easings'

/**
 * Database zap — VARIANT(plug-zap): the query bolt slams down beside the
 * still cylinder, erased then pen-drawn top-to-bottom the instant it lands
 * (the path's own point order already runs high point to low, so the draw
 * reads as a strike, not a rebuild). The cylinder takes a small dip exactly
 * on the contact frame it is struck, never a beat before.
 * Base geometry: Lucide `database-zap` (ISC).
 */
const DUR = 0.8

export function DatabaseZapIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'database zap'}
      {...hoverProps}
    >
      {/* the cylinder — still, until the bolt lands on it */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.55, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.82, 0.9, 0.96, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5V19A9 3 0 0 0 15 21.84" />
        <path d="M21 5V8" />
        <path d="M3 12A9 3 0 0 0 14.59 14.87" />
      </motion.g>
      {/* the bolt — erased fast, then slammed back down top-to-bottom */}
      <motion.path
        d="M21 12L18 17H22L19 22"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.14, 0.5, 0.82], ease: [easeInCubic, 'linear', easeOutExpo] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'database-zap',
  gesture: 'the query hits',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['db', 'fast', 'query'],
}

export default DatabaseZapIcon
