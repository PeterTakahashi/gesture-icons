import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Speech — it takes the floor. The head gives a small nod as the sound
 * arcs emit once from the mouth — erased then redrawn by length, nearer arc
 * first — a point made, never a fade.
 * Base geometry: Lucide `speech` (ISC).
 */
const DUR = 0.95

export function SpeechIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'speech'}
      {...hoverProps}
    >
      <motion.path
        d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0.8, 0, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M17 15a3.5 3.5 0 0 0-.025-4.975"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.3, 0.62, 1], ease: [easeInCubic, 'linear', easeOutQuart, 'linear'] },
          },
        }}
      />
      <motion.path
        d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.4, 0.78, 1], ease: [easeInCubic, 'linear', easeOutQuart, 'linear'] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'speech',
  gesture: 'it takes the floor',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['talk', 'accessibility', 'speech'],
}

export default SpeechIcon
