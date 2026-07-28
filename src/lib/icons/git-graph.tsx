import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack, easeOutQuart } from '../core/easings'

/**
 * Git graph — the history draws itself, git log rendered. All three lines
 * erase and all three nodes implode together, one clean wipe. Then the
 * pen rebuilds it in commit order: the root node pops first (nothing feeds
 * it), the rail draws down to the second node which pops on arrival, the
 * long branch line draws in behind it, and last the merge arc draws up to
 * the third node, which pops the instant the pen reaches it.
 * Base geometry: Lucide `git-graph` (ISC).
 */
const DUR = 1.4

export function GitGraphIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const line = (start: number, end: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, times: [0, 0.12, start, end], ease: [easeInCubic, 'linear', pen] },
    },
  })
  const node = (settleFrom: number, popAt: number, settleAt: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 1, 0.001, 0.001, 1.3, 1],
      transition: {
        duration: DUR,
        times: [0, 0.05, 0.12, settleFrom, popAt, settleAt],
        ease: ['linear', easeInCubic, 'linear', settleBack, easeOutQuart],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'git graph'}
      {...hoverProps}
    >
      {/* root — pops first, nothing feeds it */}
      <motion.circle
        cx="5" cy="6" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls} variants={node(0.12, 0.19, 0.26)}
      />
      {/* rail down to the second commit */}
      <motion.path d="M5 9v6" initial="normal" animate={controls} variants={line(0.26, 0.44)} />
      <motion.circle
        cx="5" cy="18" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls} variants={node(0.44, 0.51, 0.58)}
      />
      {/* the long-lived branch line, drawn in behind it */}
      <motion.path d="M12 3v18" initial="normal" animate={controls} variants={line(0.58, 0.76)} />
      {/* the merge arc, last — arrives exactly at the third node's edge */}
      <motion.path d="M16 15.7A9 9 0 0 0 19 9" initial="normal" animate={controls} variants={line(0.78, 0.94)} />
      <motion.circle
        cx="19" cy="6" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls} variants={node(0.94, 0.97, 1)}
      />
    </svg>
  )
}

export const meta = {
  name: 'git-graph',
  gesture: 'the history draws',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['git', 'log', 'commits'],
}

export default GitGraphIcon
