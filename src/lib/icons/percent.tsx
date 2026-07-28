import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Percent — the deal spins up. The slash erases and rewrites itself with a
 * pen stroke, while the two circles stamp themselves in one after another,
 * top-left first — a sale sign going up.
 * Base geometry: Lucide `percent` (ISC).
 */
const DUR = 0.95
const CIRCLES = [
  { cx: 6.5, cy: 6.5, delay: 0 },
  { cx: 17.5, cy: 17.5, delay: 0.09 },
]

export function PercentIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'percent'}
      {...hoverProps}
    >
      <motion.line
        x1="19" x2="5" y1="5" y2="19"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.3, 0.7], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      {CIRCLES.map((c) => (
        <motion.circle
          key={c.cx}
          cx={c.cx} cy={c.cy} r={2.5}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 0.7, 1.25, 1],
              transition: {
                duration: DUR,
                delay: c.delay,
                times: [0, 0.35, 0.62, 0.85],
                ease: [easeInCubic, settleBack, easeOutQuart],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'percent',
  gesture: 'the deal spins up',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['discount', 'sale', 'rate', 'off'],
}

export default PercentIcon
