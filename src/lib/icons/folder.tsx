import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Folder — it receives a file. A small document falls from above the frame
 * and drops straight into the folder's mouth; a clipPath covering the area
 * above the folder's front edge (y=8) hides it the instant it crosses that
 * line — clipped away, not faded — and it is put back above the frame while
 * genuinely invisible. The folder takes the catch with a small dip.
 * Base geometry: Lucide `folder` (ISC).
 */
const DUR = 1.05

export function FolderIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder'}
      {...hoverProps}
    >
      <defs>
        <clipPath id="gi-folder-clip">
          <rect x="-6" y="-10" width="36" height="18" />
        </clipPath>
      </defs>
      <motion.path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 1.2, -0.4, 0],
            transition: {
              duration: DUR,
              times: [0, 0.42, 0.54, 0.72, 1],
              ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart],
            },
          },
        }}
      />
      {/* the incoming document: hidden above the frame at rest, clipped away as it enters */}
      <motion.rect
        x="13" width="5" height="6" rx="1"
        clipPath="url(#gi-folder-clip)"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: -8 },
          animate: {
            y: [-8, -8, 8, 8, -8],
            transition: {
              duration: DUR,
              times: [0, 0.08, 0.42, 0.55, 0.56],
              ease: ['linear', gravity, 'linear', 'linear'],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'folder',
  gesture: 'it receives a file',
  family: 'secondary' as const,
  section: 'Files & time',
  tags: ['directory', 'files', 'organize'],
}

export default FolderIcon
