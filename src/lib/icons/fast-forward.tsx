import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Fast forward — it speeds ahead. Both triangles NUDGE right — a small
 * wind-up left, the drive forward, a settle-back — the front one first,
 * the one behind following 6% later, like a chase: double-time.
 * Base geometry: Lucide `fast-forward` (ISC).
 */
const DUR = 0.9
const LAG = DUR * 0.06

export function FastForwardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const nudge = (delay: number): Variants => ({
    normal: { x: 0 },
    animate: {
      x: [0, -0.8, 2.4, 0],
      transition: { duration: DUR, delay, times: [0, 0.15, 0.45, 0.7], ease: [easeInOutCubic, easeOutQuart, settleBack] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fast forward'}
      {...hoverProps}
    >
      {/* the front triangle leads */}
      <motion.path
        d="M12 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 12 18z"
        initial="normal"
        animate={controls}
        variants={nudge(0)}
      />
      <motion.path
        d="M2 6a2 2 0 0 1 3.414-1.414l6 6a2 2 0 0 1 0 2.828l-6 6A2 2 0 0 1 2 18z"
        initial="normal"
        animate={controls}
        variants={nudge(LAG)}
      />
    </svg>
  )
}

export const meta = {
  name: 'fast-forward',
  gesture: 'it speeds ahead',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['media', '2x', 'skip'],
}

export default FastForwardIcon
