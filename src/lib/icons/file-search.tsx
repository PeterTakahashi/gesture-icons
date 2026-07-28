import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * File search — the doc is inspected. The lens (circle + handle) sweeps a
 * small scan arc over the page and settles — one continuous read, nothing
 * fades, nothing spins free. The page holds still.
 * Base geometry: Lucide `file-search` (ISC).
 */
const DUR = 0.95

export function FileSearchIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file search'}
      {...hoverProps}
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11.5px 14.5px' }}
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
        <circle cx="11.5" cy="14.5" r="2.5" />
        <path d="M13.3 16.3 15 18" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-search',
  gesture: 'the doc is inspected',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['document', 'find'],
}

export default FileSearchIcon
