import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Alert circle — it signals. The ! mark BLINKs twice, a true binary step
 * with no fade, then holds steady on; the circle frame dips slightly on
 * the first blink — an alert landing in a circle.
 * Base geometry: Lucide `alert-circle` (ISC).
 */
const DUR = 1.0

export function AlertCircleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'alert circle'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" cy="12" r="10"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.5, 0, 0],
            transition: { duration: DUR, times: [0, 0.14, 0.3, 1], ease: [easeOutQuart, easeInOutCubic, 'linear'] },
          },
        }}
      />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.09, 0.1, 0.22, 0.23, 0.35, 0.36, 0.48, 0.49, 0.55],
              ease: 'linear',
            },
          },
        }}
      >
        <line x1="12" x2="12" y1="8" y2="12" />
        <line x1="12" x2="12.01" y1="16" y2="16" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'alert-circle',
  gesture: 'it signals',
  family: 'secondary' as const,
  section: 'Shapes',
  tags: ['warning', 'alert', 'circle'],
}

export default AlertCircleIcon
