import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Bubbles — they rise. Carbonation: each bubble floats up and settles back
 * at its own pace — the big one slow and heavy, the small ones quick — with
 * a tiny sideways wobble as it goes, each starting a beat after the last.
 * Base geometry: Lucide `bubbles` (ISC).
 */
export function BubblesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bubbles'}
      {...hoverProps}
    >
      <motion.circle
        cx="7.5" cy="16.5" r="5.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            y: [0, -1.5, -1.5, 0],
            x: [0, 0.4, -0.3, 0],
            transition: { duration: 1.3, times: [0, 0.4, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.circle
        cx="18.5" cy="8.5" r="3.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            y: [0, -1.5, -1.3, 0],
            x: [0, -0.3, 0.3, 0],
            transition: { duration: 1.0, delay: 0.05, times: [0, 0.35, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.circle
        cx="7.5" cy="4.5" r="2.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            y: [0, -1.2, -1, 0],
            x: [0, 0.3, -0.2, 0],
            transition: { duration: 0.75, delay: 0.1, times: [0, 0.3, 0.65, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M7.001 15.085A1.5 1.5 0 0 1 9 16.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            y: [0, -1, 0],
            x: [0, 0.2, 0],
            transition: { duration: 0.55, delay: 0.15, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bubbles',
  gesture: 'they rise',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['soap', 'clean', 'float', 'bubbles'],
}

export default BubblesIcon
