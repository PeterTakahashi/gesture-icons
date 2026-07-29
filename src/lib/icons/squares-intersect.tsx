import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Squares intersect — the two squares draw together. Their exposed corners
 * nudge toward each other along the shared diagonal — a small wind-up away
 * first, then the approach — while the overlap they already share holds
 * still, since that part never moved.
 * Base geometry: Lucide `squares-intersect` (ISC).
 */
const DUR = 0.9

function converge(dx: number, dy: number): Variants {
  return {
    normal: { x: 0, y: 0 },
    animate: {
      x: [0, -0.3 * Math.sign(dx), dx, 0],
      y: [0, -0.3 * Math.sign(dy), dy, 0],
      transition: { duration: DUR, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
    },
  }
}

export function SquaresIntersectIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'squares intersect'}
      {...hoverProps}
    >
      <path d="M8 10a2 2 0 0 1 2-2h5a1 1 0 0 1 1 1v5a2 2 0 0 1-2 2H9a1 1 0 0 1-1-1z" />
      {/* square A's exposed corners move toward the overlap */}
      <motion.g initial="normal" animate={controls} variants={converge(1.06, 1.06)}>
        <path d="M14 2a2 2 0 0 1 2 2" />
        <path d="M2 10V8" />
        <path d="M2 4a2 2 0 0 1 2-2" />
        <path d="M4 16a2 2 0 0 1-2-2" />
        <path d="M8 2h2" />
      </motion.g>
      {/* square B's exposed corners move toward the overlap */}
      <motion.g initial="normal" animate={controls} variants={converge(-1.06, -1.06)}>
        <path d="M10 22a2 2 0 0 1-2-2" />
        <path d="M16 22h-2" />
        <path d="M20 8a2 2 0 0 1 2 2" />
        <path d="M22 14v2" />
        <path d="M22 20a2 2 0 0 1-2 2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'squares-intersect',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['boolean', 'layers', 'combine', 'squares', 'intersect'],
}

export default SquaresIntersectIcon
