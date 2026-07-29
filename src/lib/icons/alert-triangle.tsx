import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Alert triangle — it signals. The ! mark BLINKs twice, a true binary step
 * with no fade, then holds steady on; the triangle frame dips slightly on
 * the first blink — an alert landing in a triangle.
 * Base geometry: Lucide `alert-triangle` (ISC).
 */
const DUR = 1.0

export function AlertTriangleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'alert triangle'}
      {...hoverProps}
    >
      <motion.path
        d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
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
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'alert-triangle',
  gesture: 'it signals',
  family: 'secondary' as const,
  section: 'Shapes',
  tags: ['warning', 'alert', 'triangle'],
}

export default AlertTriangleIcon
