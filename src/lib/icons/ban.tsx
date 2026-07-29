import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutExpo } from '../core/easings'

/**
 * Ban — it forbids. The circle never moves; the diagonal slash erases then
 * pen-redraws across it, fast and final — a rule being made, not a shape
 * being decorated.
 * Base geometry: Lucide `ban` (ISC).
 */
const DUR = 0.75

export function BanIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ban'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="M4.929 4.929 19.07 19.071"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.34, 0.8], ease: [easeInCubic, 'linear', easeOutExpo] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'ban',
  gesture: 'it forbids',
  family: 'draw-on' as const,
  section: 'Interface',
  tags: ['block', 'prohibited', 'no', 'ban'],
}

export default BanIcon
