import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Folder git — the repo folder syncs. The branch dot pops and its two stems
 * pen-redraw outward from it, staggered a touch — a commit landing — while
 * the folder holds still.
 * Base geometry: Lucide `folder-git` (ISC).
 */
const DUR = 0.9

export function FolderGitIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder git'}
      {...hoverProps}
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      <motion.circle
        cx="12" cy="13" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.55, 0.8], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M7 13h3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.42, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.path
        d="M14 13h3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.35, 0.45, 0.88], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'folder-git',
  gesture: 'the repo folder syncs',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['directory', 'git', 'repo'],
}

export default FolderGitIcon
