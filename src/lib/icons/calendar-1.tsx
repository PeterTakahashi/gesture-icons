import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Calendar 1 — it does what it means. The date numeral lifts and drops
 * back onto the page with gravity, landing dip included; the frame around
 * it takes a small dip exactly on that landing frame, the way a page turns
 * to reveal the day.
 * Base geometry: Lucide `calendar-1` (ISC).
 */
const DUR = 0.9

export function Calendar1Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'calendar 1'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.55, 0.65], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M16 2v4" />
        <path d="M3 10h18" />
        <path d="M8 2v4" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
      </motion.g>
      <motion.path
        d="M11 14h1v4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -3, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.55, 0.7], ease: [easeOutQuart, gravity, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'calendar-1',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['calendar', 'date'],
}

export default Calendar1Icon
