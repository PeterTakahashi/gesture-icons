import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Drafting compass — it sweeps an arc. The pivot leg stays planted; the
 * free leg swings open about their shared hinge, holds the wider span while
 * the radius is considered, and closes back to rest.
 * Base geometry: Lucide `drafting-compass` (ISC).
 */
const DUR = 1.0

export function DraftingCompassIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'drafting compass'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 14, 14, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.68, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m12.99 6.74 1.93 3.44" />
        <path d="m21 21-2.16-3.84" />
      </motion.g>
      <path d="M19.136 12a10 10 0 0 1-14.271 0" />
      <path d="m3 21 8.02-14.26" />
      <circle cx="12" cy="5" r="2" />
    </svg>
  )
}

export const meta = {
  name: 'drafting-compass',
  gesture: 'it sweeps an arc',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['geometry', 'draw', 'precision', 'drafting', 'compass'],
}

export default DraftingCompassIcon
