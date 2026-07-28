import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Line chart — the trend draws itself. The polyline erases then a pen
 * redraws it left to right. Lucide's source path is parameterized from its
 * right (top) end, so the same three points are re-expressed starting at
 * the left end — identical pixels, honest direction. The axis stays.
 * Base geometry: Lucide `line-chart` (ISC).
 */
const DUR = 1.0

export function LineChartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'line chart'}
      {...hoverProps}
    >
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path
        d="M7 13L10 10L14 14L19 9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.32, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'line-chart',
  gesture: 'the trend draws itself',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['graph', 'analytics'],
}

export default LineChartIcon
