import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack, easeOutQuart } from '../core/easings'

/**
 * Git commit — the commit lands. Both line segments drain away and the
 * ring implodes to nothing, then the pen redraws both lines in from the
 * edges toward the center and the ring stamps down exactly on arrival —
 * one clock, one landing frame. The right segment's endpoints are ordered
 * outer-to-center so its pathLength genuinely draws toward the ring, same
 * trick as reading a <line>'s own direction, not a taste choice.
 * Base geometry: Lucide `git-commit-horizontal` (ISC).
 */
const DUR = 1.1

export function GitCommitIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'git commit'}
      {...hoverProps}
    >
      <motion.line
        x1="3" x2="9" y1="12" y2="12"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.3, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.line
        x1="21" x2="15" y1="12" y2="12"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.3, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.circle
        cx="12" cy="12" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.001, 0.001, 1.3, 1],
            transition: {
              duration: DUR,
              times: [0, 0.2, 0.3, 0.85, 0.92, 1],
              ease: ['linear', easeInCubic, 'linear', settleBack, easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'git-commit',
  gesture: 'the commit lands',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['git', 'vcs', 'save', 'checkpoint'],
}

export default GitCommitIcon
