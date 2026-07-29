import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Pencil line — it draws itself. VARIANT(pencil): the pen jots, tip-pivoted,
 * the same rotate-and-jot as pencil.tsx; once it lifts, the underline
 * stroke pen-redraws — the line the jot just wrote.
 * Base geometry: Lucide `pencil-line` (ISC).
 */
const DUR = 1.0

export function PencilLineIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pencil line'}
      {...hoverProps}
    >
      {/* pivot at the tip (2, 21.35) — the point resting on the line */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '2px 21.35px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0, y: 0 },
          animate: {
            rotate: [0, -9, 4, 0],
            x: [0, 0, -1, 0],
            y: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 1], ease: [easeInOutCubic, pen, easeInOutCubic] },
          },
        }}
      >
        <path d="m15 5 4 4" />
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      </motion.g>
      <motion.path
        d="M13 21h8"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.04, 0.58, 0.92], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'pencil-line',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['edit', 'write', 'pencil', 'line'],
}

export default PencilLineIcon
