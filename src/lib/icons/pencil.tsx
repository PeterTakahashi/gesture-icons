import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, pen } from '../core/easings'

/**
 * Pencil — it writes. The whole pencil tips toward the page about its own
 * tip — the one point that never leaves the line — with a hair of push
 * into the surface as it writes, then lifts back upright.
 * Base geometry: Lucide `pencil` (ISC).
 */
const DUR = 0.85

export function PencilIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pencil'}
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
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeInOutCubic, pen, easeInOutCubic] },
          },
        }}
      >
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
        <path d="m15 5 4 4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'pencil',
  gesture: 'it writes',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['edit', 'draw', 'write'],
}

export default PencilIcon
