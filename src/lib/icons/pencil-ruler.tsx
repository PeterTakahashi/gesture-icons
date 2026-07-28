import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Pencil ruler — the two tools nudge apart along their shared diagonal
 * and settle back — as if checked against each other once, then set
 * back down together.
 * Base geometry: Lucide `pencil-ruler` (ISC).
 */
const DUR = 0.8

export function PencilRulerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pencil ruler'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.3, -1.1, 0],
            y: [0, -0.3, 1.1, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" />
        <path d="m8 6 2-2" />
        <path d="m18 16 2-2" />
        <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" />
      </motion.g>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.3, 1.1, 0],
            y: [0, 0.3, -1.1, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, easeInOutCubic, easeOutQuart] },
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
  name: 'pencil-ruler',
  gesture: 'tools trade places',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['design', 'draft'],
}

export default PencilRulerIcon
