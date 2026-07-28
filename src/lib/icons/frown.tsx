import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Frown — it droops. The face tilts and the mouth dips with it, holds a
 * beat, then recovers slowly — a passing cloud, not a snap back.
 * Base geometry: Lucide `frown` (ISC).
 */
const DUR = 1.2

export function FrownIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'frown'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 2, 2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <motion.path
          d="M16 16s-1.5-2-4-2-4 2-4 2"
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 0.8, 0.8, 0],
              transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
            },
          }}
        />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'frown',
  gesture: 'it droops',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['sad', 'face', 'down'],
}

export default FrownIcon
