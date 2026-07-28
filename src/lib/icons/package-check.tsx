import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, pen, easeOutQuart } from '../core/easings'

/**
 * Package check — the parcel is confirmed. The check erases fast and the
 * pen redraws it stroke-order (down-stroke, then the long climb), the same
 * beat as check.tsx; the box takes a small dip right as the tick lands,
 * confirmation landing on the parcel it belongs to.
 * Base geometry: Lucide `package-check` (ISC).
 */
const DUR = 1.0

export function PackageCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'package check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.62, 0.76, 0.9, 1], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753" />
        <path d="M3.29 7 12 12l8.71-5" />
        <path d="m7.5 4.27 8.997 5.148" />
        <path d="M12 22V12" />
      </motion.g>
      <motion.path
        d="m16 17 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.38, 0.76], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'package-check',
  gesture: 'the parcel is confirmed',
  family: 'draw-on' as const,
  section: 'Money & commerce',
  tags: ['box', 'delivered'],
}

export default PackageCheckIcon
