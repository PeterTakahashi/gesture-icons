import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutExpo } from '../core/easings'

/**
 * Soup — the steam curls up. VARIANT(coffee): each wisp erases fast then
 * pen-redraws, staggered. Lucide draws these wisps top-anchored (the `d`
 * starts at the tip and runs down toward the bowl), so — unlike coffee.tsx,
 * whose lines were authored bottom-up — the honest redraw grows from the
 * tip down into the rim rather than up away from it; kept as-drawn rather
 * than reinterpreting the base geometry. Bowl and spoon stay still.
 * Base geometry: Lucide `soup` (ISC).
 */
const DUR = 0.95

export function SoupIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const steam = (delay: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        delay,
        times: [0, 0.16, 0.36, 0.85],
        ease: [easeInCubic, 'linear', easeOutExpo],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'soup'}
      {...hoverProps}
    >
      <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
      <path d="M7 21h10" />
      <path d="M19.5 12 22 6" />
      <motion.path d="M16.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.73 1.62" initial="normal" animate={controls} variants={steam(0)} />
      <motion.path d="M11.25 3c.27.1.8.53.74 1.36-.05.83-.93 1.2-.98 2.02-.06.78.33 1.24.72 1.62" initial="normal" animate={controls} variants={steam(0.08)} />
      <motion.path d="M6.25 3c.27.1.8.53.75 1.36-.06.83-.93 1.2-1 2.02-.05.78.34 1.24.74 1.62" initial="normal" animate={controls} variants={steam(0.16)} />
    </svg>
  )
}

export const meta = {
  name: 'soup',
  gesture: 'the steam curls up',
  family: 'draw-on' as const,
  section: 'Food & drink',
  tags: ['meal', 'hot'],
}

export default SoupIcon
