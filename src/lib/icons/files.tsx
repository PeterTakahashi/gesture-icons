import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Files — the stacked copies fan once. The front file (dog-eared, z-top,
 * upper-right) noses further up-right along the stack's own offset, the
 * back file (lower-left, partly hidden) counter-noses down-left, then both
 * settle back into the exact resting overlap.
 * Base geometry: Lucide `files` (ISC).
 */
const DUR = 0.9

export function FilesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'files'}
      {...hoverProps}
    >
      {/* front file, the deeper end of the stack */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1.5, 0],
            y: [0, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
        <path d="M16.706 2.706A2.4 2.4 0 0 0 15 2v5a1 1 0 0 0 1 1h5a2.4 2.4 0 0 0-.706-1.706z" />
      </motion.g>
      {/* back file, counter-nudges the other way */}
      <motion.path
        d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.8, 0],
            y: [0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'files',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['collection', 'stack', 'files'],
}

export default FilesIcon
