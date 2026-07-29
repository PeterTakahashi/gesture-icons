import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Alert octagon — it signals. The ! mark BLINKs twice, a true binary step
 * with no fade, then holds steady on; the octagon frame dips slightly on
 * the first blink — an alert landing in an octagon.
 * Base geometry: Lucide `alert-octagon` (ISC).
 */
const DUR = 1.0

export function AlertOctagonIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'alert octagon'}
      {...hoverProps}
    >
      <motion.path
        d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z"
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
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'alert-octagon',
  gesture: 'it signals',
  family: 'secondary' as const,
  section: 'Files & time',
  tags: ['warning', 'alert', 'octagon'],
}

export default AlertOctagonIcon
