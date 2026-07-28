import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Pie chart — it serves a slice. The cut wedge (spanning roughly 3 o'clock
 * to 12 o'clock) nudges out along its own bisector — up and to the right —
 * and returns, served and taken back. The disc's outline never moves.
 * Base geometry: Lucide `pie-chart` (ISC).
 */
const DUR = 0.9

export function PieChartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pie chart'}
      {...hoverProps}
    >
      <motion.path
        d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            // wind-up in, then served out along the NE bisector, then home
            x: [0, -0.2, 1.27, 0],
            y: [0, 0.2, -1.27, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      />
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
    </svg>
  )
}

export const meta = {
  name: 'pie-chart',
  gesture: 'it serves a slice',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['graph', 'share', '分布'],
}

export default PieChartIcon
