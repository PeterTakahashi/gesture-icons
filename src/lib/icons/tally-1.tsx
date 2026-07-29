import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { pen } from '../core/easings'

/**
 * Tally 1 — it counts out loud. The single stroke erases then pen-redraws —
 * one tally mark, one beat.
 * Base geometry: Lucide `tally-1` (ISC).
 */
const DUR = 0.7

export function Tally1Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tally 1'}
      {...hoverProps}
    >
      <motion.path
        d="M4 4v16"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.15, 0.45, 0.85], ease: ['linear', 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'tally-1',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['count', 'score', 'tally'],
}

export default Tally1Icon
