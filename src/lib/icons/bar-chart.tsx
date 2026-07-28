import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack } from '../core/easings'

/**
 * Bar chart — the data arrives. All three bars collapse to nothing about
 * their shared baseline at once, then grow back staggered shortest-first,
 * tallest-last — data redrawing itself, biggest number landing last. The
 * baseline axis never moves.
 * Base geometry: Lucide `bar-chart-3` (ISC).
 */
const DUR = 1.0

export function BarChartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const bar = (growStart: number): Variants => ({
    normal: { scaleY: 1 },
    animate: {
      scaleY: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, times: [0, 0.22, growStart, 1], ease: [easeInCubic, 'linear', settleBack] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bar chart'}
      {...hoverProps}
    >
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <motion.path
        d="M18 17V9"
        style={{ transformBox: 'view-box', transformOrigin: '18px 17px' }}
        initial="normal" animate={controls} variants={bar(0.38)}
      />
      <motion.path
        d="M13 17V5"
        style={{ transformBox: 'view-box', transformOrigin: '13px 17px' }}
        initial="normal" animate={controls} variants={bar(0.46)}
      />
      <motion.path
        d="M8 17v-3"
        style={{ transformBox: 'view-box', transformOrigin: '8px 17px' }}
        initial="normal" animate={controls} variants={bar(0.3)}
      />
    </svg>
  )
}

export const meta = {
  name: 'bar-chart',
  gesture: 'the data arrives',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['graph', 'analytics', 'stats'],
}

export default BarChartIcon
