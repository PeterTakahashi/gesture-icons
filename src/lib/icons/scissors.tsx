import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack } from '../core/easings'

/**
 * Scissors — one clean snip. The two blades are rigid pieces hinged
 * where their edges actually cross — reading the geometry, that point
 * is (12,12), not the handle loops at (6,6)/(6,18) — so each blade
 * (loop + edge) rotates as a whole about that real pivot, sharp in,
 * spring back out.
 * Base geometry: Lucide `scissors` (ISC).
 */
const DUR = 0.7

export function ScissorsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scissors'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 0],
            transition: { duration: DUR, times: [0, 0.35, 1], ease: [easeInCubic, settleBack] },
          },
        }}
      >
        <circle cx="6" cy="6" r="3" />
        <path d="M8.12 8.12 12 12" />
        <path d="M14.8 14.8 20 20" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 10, 0],
            transition: { duration: DUR, times: [0, 0.35, 1], ease: [easeInCubic, settleBack] },
          },
        }}
      >
        <path d="M20 4 8.12 15.88" />
        <circle cx="6" cy="18" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'scissors',
  gesture: 'they snip once',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['cut', 'trim'],
}

export default ScissorsIcon
