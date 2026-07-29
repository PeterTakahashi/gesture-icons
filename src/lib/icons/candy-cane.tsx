import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Candy cane — it hooks on the tree. SWING about the crook, the circular
 * hook near the top of the cane (its arc center sits at roughly 16,8): a
 * decaying pendulum, as if it had just been hung.
 * Base geometry: Lucide `candy-cane` (ISC).
 */
const DUR = 1.0

export function CandyCaneIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'candy cane'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '16px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 7, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.44, 0.64, 0.82, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m10.8 5 2.111 4.223" />
        <path d="M17.75 7 15 2.1" />
        <path d="m4.874 14.647 2.12 4.24" />
        <path d="M5.7 21a2 2 0 0 1-3.5-2l8.6-14a6 6 0 0 1 10.4 6 2 2 0 1 1-3.464-2 2 2 0 1 0-3.464-2z" />
        <path d="m7.906 9.712 2.005 4.411" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'candy-cane',
  gesture: 'it hooks on the tree',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['christmas', 'sweet', 'candy', 'cane'],
}

export default CandyCaneIcon
