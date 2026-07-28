import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack, easeOutQuart } from '../core/easings'

/**
 * Git merge — the branch merges in. The curve drains away toward its own
 * source end (the top node stays put, static, the whole time — like the
 * surviving head in git-branch.tsx), then the pen redraws it, curve first,
 * arriving at the trunk last — and the receiving node stamps down exactly
 * on that arrival frame.
 * Base geometry: Lucide `git-merge` (ISC).
 */
const DUR = 1.2

export function GitMergeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'git merge'}
      {...hoverProps}
    >
      {/* the source node — never moves */}
      <circle cx="6" cy="6" r="3" />
      <motion.path
        d="M6 21V9a9 9 0 0 0 9 9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.36, 0.88], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.circle
        cx="18" cy="18" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.001, 0.001, 1.25, 1],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.22, 0.8, 0.88, 0.97],
              ease: ['linear', easeInCubic, 'linear', settleBack, easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'git-merge',
  gesture: 'the branch merges in',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['git', 'vcs', 'combine', 'pr'],
}

export default GitMergeIcon
