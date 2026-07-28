import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutExpo } from '../core/easings'

/**
 * Coffee — the steam rises. Each line erases fast then pen-redraws upward,
 * staggered 80ms, on an ease-out (rising, not falling). The three lines are
 * authored bottom-to-top so pathLength growth reads as ascending steam, not
 * a tip growing downward toward the cup. The cup stays — morning happening.
 * Base geometry: Lucide `coffee` (ISC).
 */
const DUR = 0.95

export function CoffeeIcon({
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
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'coffee'}
      {...hoverProps}
    >
      <motion.path d="M6 4v-2" initial="normal" animate={controls} variants={steam(0)} />
      <motion.path d="M10 4v-2" initial="normal" animate={controls} variants={steam(0.08)} />
      <motion.path d="M14 4v-2" initial="normal" animate={controls} variants={steam(0.16)} />
      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
    </svg>
  )
}

export const meta = {
  name: 'coffee',
  gesture: 'the steam rises',
  family: 'draw-on' as const,
  section: 'Food & drink',
  tags: ['cafe', 'drink', 'hot'],
}

export default CoffeeIcon
