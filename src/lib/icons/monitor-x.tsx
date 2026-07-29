import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Monitor X — it is refused. A head-shake "no": the X rotates about its
 * own center, decaying with each swing (x.tsx's shake), while the monitor
 * body and its stand hold still.
 * Base geometry: Lucide `monitor-x` (ISC).
 */
const DUR = 0.85

export function MonitorXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'monitor x'}
      {...hoverProps}
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, 11, -7, 4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m14.5 12.5-5-5" />
        <path d="m9.5 12.5 5-5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'monitor-x',
  gesture: 'it is refused',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['cancel', 'remove', 'monitor'],
}

export default MonitorXIcon
