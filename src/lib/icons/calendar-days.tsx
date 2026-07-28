import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Calendar days — the days fill in. The six date dots are part of the
 * resting glyph itself (unlike calendar.tsx's synthetic mark), so each POPs
 * in place rather than from nothing: a quick dip to near-zero and an
 * overshoot back to its true size, staggered in reading order (40ms per
 * dot) — the month populating while the frame holds still.
 * Base geometry: Lucide `calendar-days` (ISC).
 */
const DUR = 0.7
const DOTS: [number, number][] = [
  [8, 14], [12, 14], [16, 14],
  [8, 18], [12, 18], [16, 18],
]

export function CalendarDaysIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'calendar days'}
      {...hoverProps}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      {DOTS.map(([x, y], i) => (
        <motion.path
          key={`${x}-${y}`}
          d={`M${x} ${y}h.01`}
          style={{ transformBox: 'view-box', transformOrigin: `${x}px ${y}px` }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 0.001, 1.3, 1],
              transition: {
                duration: DUR,
                delay: i * 0.04,
                times: [0, 0.25, 0.6, 1],
                ease: [easeInCubic, settleBack, easeOutQuart],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'calendar-days',
  gesture: 'the days fill in',
  family: 'secondary' as const,
  section: 'Files & time',
  tags: ['schedule', 'month', 'dates'],
}

export default CalendarDaysIcon
