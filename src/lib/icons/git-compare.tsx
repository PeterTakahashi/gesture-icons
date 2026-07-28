import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack, easeOutQuart } from '../core/easings'

/**
 * Git compare — the branches compare. Each connector already runs, in its
 * own `d`, from near one node to the far edge of the other — so drawing
 * them on the same clock genuinely arrives at opposite nodes at once: the
 * honest reading of "opposite directions, same clock." Both nodes pop
 * together on that shared arrival frame — diffed.
 * Base geometry: Lucide `git-compare` (ISC).
 */
const DUR = 1.1

export function GitCompareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const draw: Variants = {
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, times: [0, 0.14, 0.24, 0.7], ease: [easeInCubic, 'linear', pen] },
    },
  }
  const node: Variants = {
    normal: { scale: 1 },
    animate: {
      scale: [1, 1, 0.001, 0.001, 1.3, 1],
      transition: {
        duration: DUR,
        times: [0, 0.1, 0.24, 0.7, 0.78, 0.88],
        ease: ['linear', easeInCubic, 'linear', settleBack, easeOutQuart],
      },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'git compare'}
      {...hoverProps}
    >
      <motion.path d="M13 6h3a2 2 0 0 1 2 2v7" initial="normal" animate={controls} variants={draw} />
      <motion.path d="M11 18H8a2 2 0 0 1-2-2V9" initial="normal" animate={controls} variants={draw} />
      <motion.circle
        cx="6" cy="6" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls} variants={node}
      />
      <motion.circle
        cx="18" cy="18" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls} variants={node}
      />
    </svg>
  )
}

export const meta = {
  name: 'git-compare',
  gesture: 'the branches compare',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['git', 'diff', 'review'],
}

export default GitCompareIcon
