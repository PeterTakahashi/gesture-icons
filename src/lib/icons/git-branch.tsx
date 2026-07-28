import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutQuart, pen, settleBack } from '../core/easings'

/**
 * Git branch — it rewrites itself. The line drains INTO the branch head
 * (the survivor), the lower node implodes as the line leaves it, then the
 * pen writes the whole branch back on — curve first, trunk up — and the
 * node pops back with the nib pressing it down.
 * The path starts on the head's edge, so a zero-length dash's round cap
 * lands ON the ring and the empty state has no stray dot.
 * Base geometry: Lucide `git-branch` (ISC).
 */
const DUR = 1.25

export function GitBranchIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'git branch'}
      {...hoverProps}
    >
      {/* the head survives — everything else is rewritten around it */}
      <circle cx="18" cy="6" r="3" />
      <motion.path
        d="M15 6a9 9 0 0 0-9 9V3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: {
              duration: DUR,
              times: [0, 0.26, 0.42, 0.9],
              ease: [easeInOutQuart, 'linear', pen],
            },
          },
        }}
      />
      <motion.circle
        cx="6" cy="18" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            // implodes as the line drains past it; pops back once the pen returns
            scale: [1, 1, 0.001, 0.001, 1.25, 1],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.26, 0.66, 0.82, 0.95],
              ease: ['linear', easeInCubic, 'linear', settleBack, [0.25, 1, 0.5, 1]],
            },
          },
        }}
      />
    </svg>
  )
}
