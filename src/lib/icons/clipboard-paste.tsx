import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Clipboard paste — the arrow does the pasting: a wind-up left, then the
 * drive right along its own shaft, dropping the content in and landing
 * back exactly on the resting glyph. The board underneath takes its
 * familiar soft dip.
 * Base geometry: Lucide `clipboard-paste` (ISC).
 */
const DUR = 0.9

export function ClipboardPasteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clipboard paste'}
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
        <path d="M16 4h2a2 2 0 0 1 2 2v1.344" />
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
      </motion.g>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1, 1.8, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.6, 0.85], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M11 14h10" />
        <path d="m17 18 4-4-4-4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'clipboard-paste',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['clipboard', 'tasks', 'paste'],
}

export default ClipboardPasteIcon
