import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Line squiggle — it does what it means. VARIANT(waves): this glyph is a
 * single continuous stroke, so there is no second bar to stagger against —
 * instead the whole line does a decaying shimmy along x, the same
 * lag-and-settle shape as bell.tsx's swing, landing dead still.
 * Base geometry: Lucide `line-squiggle` (ISC).
 */
const DUR = 1.0

export function LineSquiggleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'line squiggle'}
      {...hoverProps}
    >
      <motion.path
        d="M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 6-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1.5, 1.3, -0.9, 0.5, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.54, 0.7, 0.86, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'line-squiggle',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['wave', 'signal', 'line', 'squiggle'],
}

export default LineSquiggleIcon
