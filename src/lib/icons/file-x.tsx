import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * File X — the doc is rejected. The X shakes "no" about its own center,
 * decaying with each swing, same beat as x.tsx; the page holds still while
 * it refuses.
 * Base geometry: Lucide `file-x` (ISC).
 */
const DUR = 0.85

export function FileXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file x'}
      {...hoverProps}
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 3, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m14.5 12.5-5 5" />
        <path d="m9.5 12.5 5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-x',
  gesture: 'the doc is rejected',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['document', 'delete', 'deny'],
}

export default FileXIcon
