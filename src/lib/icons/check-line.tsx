import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Check line — there is no frame to hold it, so the whole glyph draws
 * itself in stroke order: the short entry stroke, then the long tick, then
 * the baseline swept underneath, each erasing fast and pen-redrawing.
 * Two of the three paths are the same straight segments as Lucide's `d`
 * with their endpoints listed start-to-end instead of end-to-start — for a
 * straight line that changes nothing about the resting picture, only which
 * way the dash draws, so the pen can move the way a hand actually would.
 * Base geometry: Lucide `check-line` (ISC).
 */
const DUR = 1.0

export function CheckLineIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'check line'}
      {...hoverProps}
    >
      <motion.path
        d="M4 10L9 15"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.3, 0.5], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.path
        d="M9 15L20 4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.3, 0.68], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.path
        d="M3 19L21 19"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.92], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'check-line',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Interface',
  tags: ['frame', 'mark', 'check', 'line'],
}

export default CheckLineIcon
