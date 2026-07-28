import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Calendar clock — the hour approaches. Only the little clock's hand turns
 * one fast full lap about the dial's own center (16, 16) and lands exactly
 * back where it started; the calendar around it holds still — time running
 * while the date waits.
 * Base geometry: Lucide `calendar-clock` (ISC).
 */
const DUR = 0.75
const LAP_EASE: [number, number, number, number] = [0.4, 0, 0.3, 1]

export function CalendarClockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'calendar clock'}
      {...hoverProps}
    >
      <path d="M16 2v4" />
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
      <path d="M3 10h5" />
      <path d="M8 2v4" />
      <circle cx="16" cy="16" r="6" />
      <motion.path
        d="M16 14v2.2l1.6 1"
        style={{ transformBox: 'view-box', transformOrigin: '16px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 360],
            transition: { duration: DUR, ease: LAP_EASE },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'calendar-clock',
  gesture: 'the hour approaches',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['schedule', 'deadline', 'soon'],
}

export default CalendarClockIcon
