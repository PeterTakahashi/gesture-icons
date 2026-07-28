import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Thumbs up — it approves. The hand winds down a touch first (the load),
 * then swings up past vertical and settles — the classic approval gesture,
 * hinged at the wrist heel where the hand actually rests.
 * Base geometry: Lucide `thumbs-up` (ISC).
 */
const DUR = 0.9

export function ThumbsUpIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'thumbs up'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 9, -12, 0],
            y: [0, 1, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.62, 0.9], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
        <path d="M7 10v12" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'thumbs-up',
  gesture: 'it approves',
  family: 'rigid' as const,
  section: 'People',
  tags: ['like', 'approve', 'yes', 'good'],
}

export default ThumbsUpIcon
