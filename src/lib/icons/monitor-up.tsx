import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Monitor up — it urges upward. NUDGE up: the arrow winds down a hair then
 * drives up past the mark and settles home; the screen and stand never move.
 * Base geometry: Lucide `monitor-up` (ISC).
 */
const DUR = 0.75

export function MonitorUpIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'monitor up'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, -2.5, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m9 10 3-3 3 3" />
        <path d="M12 13V7" />
      </motion.g>
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
    </svg>
  )
}

export const meta = {
  name: 'monitor-up',
  gesture: 'it urges upward',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['up', 'monitor'],
}

export default MonitorUpIcon
