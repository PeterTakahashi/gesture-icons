import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Percent circle — the rate spins up. VARIANT(percent): the slash erases
 * and a pen redraws it, while the two dots press and pop top-left first —
 * same motion language as the bare percent sign, inside a still ring.
 * Base geometry: Lucide `percent-circle` (ISC).
 */
const DUR = 0.95
const DOTS = [
  { cx: 9, cy: 9, delay: 0 },
  { cx: 15, cy: 15, delay: 0.09 },
]

export function PercentCircleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'percent circle'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="m15 9-6 6"
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
      {DOTS.map((d) => (
        <motion.path
          key={`${d.cx}-${d.cy}`}
          d={`M${d.cx} ${d.cy}h.01`}
          style={{ transformBox: 'view-box', transformOrigin: `${d.cx}px ${d.cy}px` }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 0.7, 1.25, 1],
              transition: {
                duration: DUR,
                delay: d.delay,
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
  name: 'percent-circle',
  gesture: 'the rate spins up',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['discount', 'ratio'],
}

export default PercentCircleIcon
