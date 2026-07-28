import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Airplay — it casts to the screen. The triangle NUDGEs up into the frame
 * — a small wind-up down, the drive up, a settle-back — handing off; the
 * frame receives with a subtle press exactly on contact.
 * Base geometry: Lucide `airplay` (ISC).
 */
const DUR = 0.9

export function AirplayIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'airplay'}
      {...hoverProps}
    >
      <motion.path
        d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.97, 1.02, 1],
            transition: { duration: DUR, times: [0, 0.44, 0.54, 0.66, 0.85], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="m12 15 5 6H7Z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.6, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.48, 0.72], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'airplay',
  gesture: 'it casts to the screen',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['stream', 'apple', 'mirror'],
}

export default AirplayIcon
