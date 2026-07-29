import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Frame — it makes its move. Lucide draws this one as four full crosshair
 * lines rather than corner brackets, so the honest read of the same NUDGE
 * is each line squeezing inward along its own perpendicular axis — a small
 * wind-up outward, the framing squeeze in, settleBack to the resting grid.
 * Base geometry: Lucide `frame` (ISC).
 */
const DUR = 0.85
const NUDGE = { times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] }
const WIND = 0.35
const DRIVE = 1.5

export function FrameIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'frame'}
      {...hoverProps}
    >
      <motion.line
        x1="22" x2="2" y1="6" y2="6"
        initial="normal"
        animate={controls}
        variants={{ normal: { y: 0 }, animate: { y: [0, -WIND, DRIVE, 0], transition: { duration: DUR, ...NUDGE } } }}
      />
      <motion.line
        x1="22" x2="2" y1="18" y2="18"
        initial="normal"
        animate={controls}
        variants={{ normal: { y: 0 }, animate: { y: [0, WIND, -DRIVE, 0], transition: { duration: DUR, ...NUDGE } } }}
      />
      <motion.line
        x1="6" x2="6" y1="2" y2="22"
        initial="normal"
        animate={controls}
        variants={{ normal: { x: 0 }, animate: { x: [0, -WIND, DRIVE, 0], transition: { duration: DUR, ...NUDGE } } }}
      />
      <motion.line
        x1="18" x2="18" y1="2" y2="22"
        initial="normal"
        animate={controls}
        variants={{ normal: { x: 0 }, animate: { x: [0, WIND, -DRIVE, 0], transition: { duration: DUR, ...NUDGE } } }}
      />
    </svg>
  )
}

export const meta = {
  name: 'frame',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['frame', 'select'],
}

export default FrameIcon
