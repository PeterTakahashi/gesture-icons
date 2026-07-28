import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Calendar X — the plans fall through. Only the X shakes no, hinged at the
 * center of its own 4×4 box (12, 16) — the frame around it never moves,
 * because the cancellation is the X's alone.
 * Base geometry: Lucide `calendar-x` (ISC).
 */
const DUR = 0.85

export function CalendarXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'calendar x'}
      {...hoverProps}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, 11, -7, 4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m14 14-4 4" />
        <path d="m10 14 4 4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'calendar-x',
  gesture: 'the plans fall through',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['schedule', 'cancel'],
}

export default CalendarXIcon
