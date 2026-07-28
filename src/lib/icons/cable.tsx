import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cable — it plugs through. The two connectors nudge toward each other
 * along the cable's own diagonal, 1.5 units each, testing the tension, and
 * return. The cable run between them is the only part that stays put.
 * Base geometry: Lucide `cable` (ISC).
 */
const DUR = 0.9

export function CableIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cable'}
      {...hoverProps}
    >
      {/* top-right connector, drawn toward the bottom-left one */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1.06, 0],
            y: [0, 1.06, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.86], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M17 19a1 1 0 0 1-1-1v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a1 1 0 0 1-1 1z" />
        <path d="M17 21v-2" />
        <path d="M21 21v-2" />
      </motion.g>
      <path d="M19 14V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V10" />
      {/* bottom-left connector, drawn toward the top-right one */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1.06, 0],
            y: [0, -1.06, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.86], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M3 5V3" />
        <path d="M4 10a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2z" />
        <path d="M7 5V3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'cable',
  gesture: 'it plugs through',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['cord', 'connect'],
}

export default CableIcon
