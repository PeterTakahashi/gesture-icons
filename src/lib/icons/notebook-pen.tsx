import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Notebook pen — notes are taken. Only the pen moves: a small, organic
 * scribble hinged at its own nib (where it touches the page), tracing a
 * loose figure-eight before it comes to rest — a line jotted, nothing more.
 * Base geometry: Lucide `notebook-pen` (ISC).
 */
const DUR = 0.9

export function NotebookPenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'notebook pen'}
      {...hoverProps}
    >
      <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" />
      <path d="M2 6h4" />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <motion.path
        d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
        style={{ transformBox: 'view-box', transformOrigin: '12.3px 11.7px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            x: [0, 1, -1, 0.6, -0.6, 0],
            y: [0, -0.6, 0.6, -0.4, 0.4, 0],
            rotate: [0, 3, -3, 2, -2, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.38, 0.58, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'notebook-pen',
  gesture: 'notes are taken',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['write', 'journal'],
}

export default NotebookPenIcon
