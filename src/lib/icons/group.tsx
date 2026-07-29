import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Group — the two shapes unite. They draw together along their shared
 * diagonal, deepening the overlap for a beat, then settle back to exactly
 * the picture Lucide drew — the boolean read as a breath. The corner
 * brackets are the selection marquee around the action, so they hold.
 * Base geometry: Lucide `group` (ISC).
 */
const DUR = 1.0

export function GroupIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'group'}
      {...hoverProps}
    >
      <path d="M3 7V5c0-1.1.9-2 2-2h2" />
      <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
      <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
      <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
      <motion.rect
        width="7" height="5" x="7" y="7" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, 0.9, 0], y: [0, 0.9, 0], transition: { duration: DUR, times: [0, 0.55, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      />
      <motion.rect
        width="7" height="5" x="10" y="12" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, -0.9, 0], y: [0, -0.9, 0], transition: { duration: DUR, times: [0, 0.55, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'group',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['boolean', 'layers', 'combine', 'group'],
}

export default GroupIcon
