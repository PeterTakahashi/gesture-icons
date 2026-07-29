import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Squares exclude — the two shapes part. Each XOR remainder nudges outward
 * along its own diagonal, away from the other, with a small wind-up back
 * toward it first — then settles exactly where it was drawn.
 * Base geometry: Lucide `squares-exclude` (ISC).
 */
const DUR = 0.9

function part(dx: number, dy: number): Variants {
  return {
    normal: { x: 0, y: 0 },
    animate: {
      x: [0, -0.3 * Math.sign(dx), dx, 0],
      y: [0, -0.3 * Math.sign(dy), dy, 0],
      transition: { duration: DUR, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
    },
  }
}

export function SquaresExcludeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'squares exclude'}
      {...hoverProps}
    >
      <motion.path
        d="M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0"
        initial="normal" animate={controls} variants={part(1.06, 1.06)}
      />
      <motion.path
        d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2"
        initial="normal" animate={controls} variants={part(-1.06, -1.06)}
      />
    </svg>
  )
}

export const meta = {
  name: 'squares-exclude',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['boolean', 'layers', 'combine', 'squares', 'exclude'],
}

export default SquaresExcludeIcon
