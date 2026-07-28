import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Wine — it swirls. The bowl and its surface line turn about the point
 * where the bowl meets the stem — the taster's wrist rolling the glass —
 * decaying with each pass. The stem and base never move; they're held.
 * Base geometry: Lucide `wine` (ISC).
 */
const DUR = 1.1

export function WineIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wine'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -5, 4, -2.5, 1, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.42, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M7 10h10" />
        <path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" />
      </motion.g>
      <path d="M8 22h8" />
      <path d="M12 15v7" />
    </svg>
  )
}

export const meta = {
  name: 'wine',
  gesture: 'it swirls',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['glass', 'drink', 'bar'],
}

export default WineIcon
