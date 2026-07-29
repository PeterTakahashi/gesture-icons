import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Clipboard copy — the duplicate arrow does the copying: a wind-up right,
 * then the drive left along its own shaft, landing back exactly on the
 * resting glyph. The board underneath takes its familiar soft dip.
 * Base geometry: Lucide `clipboard-copy` (ISC).
 */
const DUR = 0.9

export function ClipboardCopyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clipboard copy'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.78, 1], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
        <path d="M16 4h2a2 2 0 0 1 2 2v4" />
      </motion.g>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 1, -1.8, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.6, 0.85], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M21 14H11" />
        <path d="m15 10-4 4 4 4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'clipboard-copy',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['clipboard', 'tasks', 'copy'],
}

export default ClipboardCopyIcon
