import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Building — the office lights up. Every window is lit at rest (Lucide's
 * glyph), so the gesture is a hard-step blink-off then back-on, cascading
 * top row to bottom row, 60ms apart — an evening shift starting up. The
 * structure and door never move.
 * Base geometry: Lucide `building` (ISC).
 */
const DUR = 1.0
// top-down, left to right within each row
const WINDOWS = [
  { cx: 8, cy: 6 }, { cx: 12, cy: 6 }, { cx: 16, cy: 6 },
  { cx: 8, cy: 10 }, { cx: 12, cy: 10 }, { cx: 16, cy: 10 },
  { cx: 8, cy: 14 }, { cx: 12, cy: 14 }, { cx: 16, cy: 14 },
]

export function BuildingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'building'}
      {...hoverProps}
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      {WINDOWS.map((w, i) => (
        <motion.path
          key={`${w.cx}-${w.cy}`}
          d={`M${w.cx} ${w.cy}h.01`}
          initial="normal"
          animate={controls}
          variants={{
            normal: { opacity: 1 },
            animate: {
              opacity: [1, 1, 0, 0, 1, 1],
              transition: { duration: DUR, delay: i * 0.06, times: [0, 0.08, 0.09, 0.22, 0.23, 0.3], ease: 'linear' },
            },
          }}
        />
      ))}
      <path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
    </svg>
  )
}

export const meta = {
  name: 'building',
  gesture: 'the office lights up',
  family: 'secondary' as const,
  section: 'Buildings',
  tags: ['office', 'city', 'company'],
}

export default BuildingIcon
