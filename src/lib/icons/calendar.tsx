import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Calendar — today gets marked. A dot pops onto a date cell near the bottom
 * right, holds so the stamp reads, then collapses away — like chat.tsx's
 * typing dots, hidden at rest by scale rather than a fade. The calendar
 * takes a tiny dip as the mark lands.
 * Base geometry: Lucide `calendar` (ISC).
 */
const DUR = 1.0

export function CalendarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'calendar'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.6], ease: [easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </motion.g>
      {/* the stamp: hidden at rest by scale, popped onto the date cell */}
      <motion.circle
        cx="15.5" cy="15.5" r="1.2"
        fill={color === 'currentColor' ? 'currentColor' : color}
        stroke="none"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 0 },
          animate: {
            scale: [0, 1.35, 1, 1, 0],
            transition: {
              duration: DUR,
              times: [0, 0.34, 0.5, 0.78, 0.92],
              ease: [settleBack, easeOutQuart, 'linear', easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'calendar',
  gesture: 'today gets marked',
  family: 'secondary' as const,
  section: 'Files & time',
  tags: ['date', 'schedule', 'event', 'day'],
}

export default CalendarIcon
