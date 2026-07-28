import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cup soda — the straw stirs. The straw turns about the point it enters the
 * lid, a small circular stir; the cup itself takes a much smaller jostle on
 * the same clock — stirred, not shaken.
 * Base geometry: Lucide `cup-soda` (ISC).
 */
const DUR = 0.9

export function CupSodaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cup soda'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0.6, -0.5, 0.3, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.55, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m6 8 1.75 12.28a2 2 0 0 0 2 1.72h4.54a2 2 0 0 0 2-1.72L18 8" />
        <path d="M5 8h14" />
        <path d="M7 15a6.47 6.47 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
      </motion.g>
      <motion.path
        d="m12 8 1-6h2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 4, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.64, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cup-soda',
  gesture: 'the straw stirs',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['drink', 'soda'],
}

export default CupSodaIcon
