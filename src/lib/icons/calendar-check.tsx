import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, easeOutQuart, pen } from '../core/easings'

/**
 * Calendar check — the date is kept. The check erases fast and pen-redraws
 * stroke by stroke, and the calendar frame takes calendar.tsx's small dip
 * exactly as the redraw lands — the date confirmed.
 * Base geometry: Lucide `calendar-check` (ISC).
 */
const DUR = 1.0

export function CalendarCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'calendar check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.72, 0.92], ease: [easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </motion.g>
      <motion.path
        d="m9 16 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.4, 0.85], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'calendar-check',
  gesture: 'the date is kept',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['schedule', 'confirmed'],
}

export default CalendarCheckIcon
