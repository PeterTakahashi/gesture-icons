import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * File stack — a new page lands on the pile. Unlike the other file-text
 * variants, this glyph has no separate accent mark to isolate — it's three
 * overlapping file outlines, the same shape as `layers.tsx`. So it borrows
 * that mechanic directly: the top (complete) file lifts and drops, and the
 * impact propagates down through the two partial outlines below it with a
 * ~3% lag each — the middle sheet is hit by the one above it, not by the
 * drop itself.
 * Base geometry: Lucide `file-stack` (ISC).
 */
const DUR = 1.0

export function FileStackIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file stack'}
      {...hoverProps}
    >
      <motion.path
        d="M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.85, -0.25, 0],
            transition: { duration: DUR, times: [0, 0.56, 0.69, 0.85, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 1.3, -0.4, 0],
            transition: { duration: DUR, times: [0, 0.53, 0.66, 0.82, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2.8, 0.7, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.56, 0.74, 1], ease: [easeOutQuart, gravity, easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'file-stack',
  gesture: 'a new page lands on the pile',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'stack'],
}

export default FileStackIcon
