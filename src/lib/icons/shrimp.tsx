import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Shrimp — it flicks away. The tail fin and its curl kick hard about the
 * joint where they meet the body, and the whole animal darts backward on
 * that kick — shrimp swim tail-first — before drifting back to rest.
 * Base geometry: Lucide `shrimp` (ISC).
 */
const DUR = 0.9

export function ShrimpIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shrimp'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1.5, -1, 0.3, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.55, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M11 12h.01" />
        <path d="M14 2a3.28 3.28 0 0 1-3.227 1.798l-6.17-.561A2.387 2.387 0 1 0 4.387 8H15.5a1 1 0 0 1 0 13 1 1 0 0 0 0-5H12a7 7 0 0 1-7-7V8" />
        <path d="M14 8a8.5 8.5 0 0 1 0 8" />
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: '15px 16px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -8, 4, 0],
              transition: { duration: DUR, times: [0, 0.32, 0.62, 1], ease: easeOutQuart },
            },
          }}
        >
          <path d="M13 22c.5-.5 1.12-1 2.5-1-1.38 0-2-.5-2.5-1" />
          <path d="M16 16c2 0 4.5-4 4-6" />
        </motion.g>
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'shrimp',
  gesture: 'it flicks away',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['seafood', 'ocean', 'shrimp'],
}

export default ShrimpIcon
