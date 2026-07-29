import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Slash — it divides. The stroke erases then a pen redraws it top-right to
 * bottom-left, following the path's own natural direction — one decisive cut.
 * Base geometry: Lucide `slash` (ISC).
 */
const DUR = 0.75

export function SlashIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'slash'}
      {...hoverProps}
    >
      <motion.path
        d="M22 2 2 22"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.26, 0.4, 1], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'slash',
  gesture: 'it divides',
  family: 'draw-on' as const,
  section: 'Interface',
  tags: ['divider', 'or', 'path', 'slash'],
}

export default SlashIcon
