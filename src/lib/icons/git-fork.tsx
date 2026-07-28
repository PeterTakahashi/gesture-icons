import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack, easeOutQuart } from '../core/easings'

/**
 * Git fork — the project forks. The geometry's single root sits at the
 * bottom (12,18); the stem and the bar both climb from it up to the two
 * branch nodes, so the deviation from the spec's "top down" reading is
 * geometric, not a taste call. Stem and bar erase into the root together
 * and pen-redraw on the same clock; both branch nodes pop together the
 * instant the redraw completes — the frame the fork is whole again — one
 * history, two futures.
 * Base geometry: Lucide `git-fork` (ISC).
 */
const DUR = 1.1

export function GitForkIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const draw: Variants = {
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, times: [0, 0.14, 0.24, 0.68], ease: [easeInCubic, 'linear', pen] },
    },
  }
  const node: Variants = {
    normal: { scale: 1 },
    animate: {
      scale: [1, 1, 0.001, 0.001, 1.3, 1],
      transition: {
        duration: DUR,
        times: [0, 0.1, 0.24, 0.68, 0.76, 0.85],
        ease: ['linear', easeInCubic, 'linear', settleBack, easeOutQuart],
      },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'git fork'}
      {...hoverProps}
    >
      <circle cx="12" cy="18" r="3" />
      <motion.path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" initial="normal" animate={controls} variants={draw} />
      <motion.path d="M12 12v3" initial="normal" animate={controls} variants={draw} />
      <motion.circle
        cx="6" cy="6" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls} variants={node}
      />
      <motion.circle
        cx="18" cy="6" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls} variants={node}
      />
    </svg>
  )
}

export const meta = {
  name: 'git-fork',
  gesture: 'the project forks',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['git', 'fork', 'branch'],
}

export default GitForkIcon
