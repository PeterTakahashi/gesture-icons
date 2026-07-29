import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Edit 3 — VARIANT(pencil): the pen jots first, tip-pivoted at (2, 21.35)
 * exactly as pencil.tsx and edit-2.tsx. Because this is the signature-
 * flavored glyph, the underline stroke pen-redraws after the jot finishes —
 * erase fast, then write it back on stroke-order.
 * Base geometry: Lucide `edit-3` (ISC).
 */
const DUR = 1.0

export function Edit3Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'edit 3'}
      {...hoverProps}
    >
      <motion.path
        d="M13 21h8"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.42, 0.44, 0.5, 0.92], ease: ['linear', easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.path
        d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
        style={{ transformBox: 'view-box', transformOrigin: '2px 21.35px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0, y: 0 },
          animate: {
            rotate: [0, -9, 4, 0],
            x: [0, 0, -1, 0],
            y: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.26, 0.42, 0.5], ease: [easeInOutCubic, pen, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'edit-3',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['edit', 'write'],
}

export default Edit3Icon
