import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Turtle — it takes its time. The slowest NUDGE in the set: one deliberate
 * step forward over a long beat, easeInOutCubic the whole way. The front
 * legs (the part that actually pushes off) lead the shell by 3%; the back
 * leg bar trails 3% behind, the way a heavy shell catches up last.
 * Base geometry: Lucide `turtle` (ISC).
 */
const DUR = 1.5
const X: [number, number, number, number, number] = [0, -0.15, 1.8, 1.8, 0]

export function TurtleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'turtle'}
      {...hoverProps}
    >
      {/* front legs push off first */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: X,
            transition: { duration: DUR, times: [0, 0.07, 0.52, 0.72, 0.97], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M4.82 7.9 8 10" />
        <path d="M15.18 7.9 12 10" />
      </motion.g>
      {/* the shell and body ride the middle of the step */}
      <motion.path
        d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: X,
            transition: { duration: DUR, times: [0, 0.1, 0.55, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
      {/* the back leg bar is last to catch up */}
      <motion.path
        d="M16.93 10H20a2 2 0 0 1 0 4H2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: X,
            transition: { duration: DUR, times: [0, 0.13, 0.58, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'turtle',
  gesture: 'it takes its time',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['slow', 'animal', 'steady'],
}

export default TurtleIcon
