import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Ellipsis — something is pending. The three dots pop in reading order, left
 * to right, each a scale beat (never opacity) 80ms apart, landing back at
 * their resting size.
 * Base geometry: Lucide `ellipsis` (ISC).
 */
const DOT_DUR = 0.5
const STEP = 0.08
const DOTS = [5, 12, 19]

export function EllipsisIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ellipsis'}
      {...hoverProps}
    >
      {DOTS.map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx} cy="12" r="1"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 0.6, 1.3, 1],
              transition: {
                duration: DOT_DUR,
                delay: i * STEP,
                times: [0, 0.3, 0.65, 1],
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
  name: 'ellipsis',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['menu', 'more', 'options', 'ellipsis'],
}

export default EllipsisIcon
