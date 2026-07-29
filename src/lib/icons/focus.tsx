import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Focus — the four corner brackets NUDGE inward together, each along its
 * own diagonal toward center, hold the tighter frame for a beat, then let go
 * back to the original — a focus pulled in and released. The center mark
 * holds still throughout.
 * Base geometry: Lucide `focus` (ISC).
 */
const DUR = 1.0
const D = 1.1

const corner = (sx: number, sy: number): Variants => ({
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, D * sx, D * sx, 0],
    y: [0, D * sy, D * sy, 0],
    transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
  },
})

export function FocusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'focus'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="3" />
      <motion.path d="M3 7V5a2 2 0 0 1 2-2h2" initial="normal" animate={controls} variants={corner(1, 1)} />
      <motion.path d="M17 3h2a2 2 0 0 1 2 2v2" initial="normal" animate={controls} variants={corner(-1, 1)} />
      <motion.path d="M21 17v2a2 2 0 0 1-2 2h-2" initial="normal" animate={controls} variants={corner(-1, -1)} />
      <motion.path d="M7 21H5a2 2 0 0 1-2-2v-2" initial="normal" animate={controls} variants={corner(1, -1)} />
    </svg>
  )
}

export const meta = {
  name: 'focus',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['frame', 'select', 'focus'],
}

export default FocusIcon
