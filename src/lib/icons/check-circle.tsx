import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Check circle — the ring takes one soft breath while the tick pen-redraws
 * inside it: erase fast, then write it back on stroke-order, landing on the
 * resting glyph exactly as check.tsx and badge-check.tsx do.
 * Base geometry: Lucide `check-circle` (ISC).
 */
const DUR = 0.95

export function CheckCircleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'check circle'}
      {...hoverProps}
    >
      <motion.path
        d="M21.801 10A10 10 0 1 1 17 3.335"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.45, 0.85], ease: easeOutQuart },
          },
        }}
      />
      <motion.path
        d="m9 11 3 3L22 4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.4, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'check-circle',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Interface',
  tags: ['frame', 'mark', 'check', 'circle'],
}

export default CheckCircleIcon
