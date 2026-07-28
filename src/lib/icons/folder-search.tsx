import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Folder search — the folder is searched. The lens (circle + handle) sweeps
 * a small scan arc over the folder and settles — one continuous read.
 * Base geometry: Lucide `folder-search` (ISC).
 */
const DUR = 0.95

export function FolderSearchIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder search'}
      {...hoverProps}
    >
      <path d="M10.7 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v4.1" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            x: [0, -1.5, 1.3, 0],
            y: [0, -1.2, 1, 0],
            rotate: [0, -5, 4, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.66, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m21 21-1.9-1.9" />
        <circle cx="17" cy="17" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'folder-search',
  gesture: 'the folder is searched',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['directory', 'find'],
}

export default FolderSearchIcon
