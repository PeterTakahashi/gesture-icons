import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart } from '../core/easings'
import type { Bezier } from '../core/easings'

/**
 * File — a fresh page. The whole sheet takes one soft, air-resistance
 * bounce — up a hair, a slow settle that overshoots just past rest, home —
 * the way a light page settles after it's set down. The folded corner leads
 * the page by 3% of the beat, the way it would catch air first.
 * Base geometry: Lucide `file` (ISC).
 */
const DUR = 1.0
const airFall: Bezier = [0.32, 0.02, 0.44, 1] // decelerating fall, softer than gravity

export function FileIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file'}
      {...hoverProps}
    >
      <motion.path
        d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.75, 1], ease: [easeOutQuart, airFall, easeOutQuart] },
          },
        }}
      />
      {/* the folded corner leads the page by 3% — it catches air first */}
      <motion.path
        d="M14 2v5a1 1 0 0 0 1 1h5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.72, 1], ease: [easeOutQuart, airFall, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'file',
  gesture: 'a fresh page',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['document', 'new', 'blank'],
}

export default FileIcon
