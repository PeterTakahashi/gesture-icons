import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Activity square — it does what it means. VARIANT(waves/audio-lines): the
 * activity trace is a single continuous zigzag, so it carries its own verb
 * as one rigid part — a pulse of amplitude about its own centerline, the
 * spike growing and settling like a live reading, frame still.
 * Base geometry: Lucide `activity-square` (ISC).
 */
const DUR = 0.9

export function ActivitySquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'activity square'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path
        d="M17 12h-2l-2 5-2-10-2 5H7"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.35, 0.8, 1.15, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'activity-square',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['wave', 'signal', 'activity', 'square'],
}

export default ActivitySquareIcon
