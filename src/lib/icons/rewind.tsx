import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Rewind — it winds back. Mirror of fast-forward, leftward: the front
 * (leftmost) triangle leads the nudge, the one behind follows 6% later.
 * Base geometry: Lucide `rewind` (ISC).
 */
const DUR = 0.9
const LAG = DUR * 0.06

export function RewindIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const nudge = (delay: number): Variants => ({
    normal: { x: 0 },
    animate: {
      x: [0, 0.8, -2.4, 0],
      transition: { duration: DUR, delay, times: [0, 0.15, 0.45, 0.7], ease: [easeInOutCubic, easeOutQuart, settleBack] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'rewind'}
      {...hoverProps}
    >
      {/* the front (leftmost) triangle leads */}
      <motion.path
        d="M12 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 12 18z"
        initial="normal"
        animate={controls}
        variants={nudge(0)}
      />
      <motion.path
        d="M22 6a2 2 0 0 0-3.414-1.414l-6 6a2 2 0 0 0 0 2.828l6 6A2 2 0 0 0 22 18z"
        initial="normal"
        animate={controls}
        variants={nudge(LAG)}
      />
    </svg>
  )
}

export const meta = {
  name: 'rewind',
  gesture: 'it winds back',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['media', 'back', 'replay'],
}

export default RewindIcon
