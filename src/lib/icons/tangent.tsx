import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack } from '../core/easings'

/**
 * Tangent — it touches the curve. The straight line erases then a pen
 * redraws it, and both handle markers — the base geometry gives no single
 * dot a better claim to "the" contact point than the other — pop together
 * the instant the line arrives. The curve itself is the fixed subject and
 * never moves.
 * Base geometry: Lucide `tangent` (ISC).
 */
const DUR = 0.9

export function TangentIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const dot = {
    normal: { scale: 1 },
    animate: {
      scale: [1, 1, 1.3, 1],
      transition: { duration: DUR, times: [0, 0.55, 0.68, 0.85], ease: settleBack },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tangent'}
      {...hoverProps}
    >
      <path d="M12 22s-4-9-1.5-11.5S22 12 22 12" />
      <motion.path
        d="M15.59 5.41 5.41 15.59"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.36, 0.55], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.circle
        cx="17" cy="4" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={dot}
      />
      <motion.circle
        cx="4" cy="17" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={dot}
      />
    </svg>
  )
}

export const meta = {
  name: 'tangent',
  gesture: 'it touches the curve',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['math', 'geometry', 'tangent'],
}

export default TangentIcon
