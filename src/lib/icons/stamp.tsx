import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Stamp — it comes down firm. The head falls under gravity onto the
 * base, the base takes the dip exactly on the contact frame, then the
 * head lifts back to rest. The pad line on the paper never moves.
 * Base geometry: Lucide `stamp` (ISC).
 */
const DUR = 0.9

export function StampIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'stamp'}
      {...hoverProps}
    >
      <motion.path
        d="M14 13V8.5C14 7 15 7 15 5a3 3 0 0 0-6 0c0 2 1 2 1 3.5V13"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -0.6, 2.6, 2.4, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.48, 0.62, 1], ease: [easeOutQuart, gravity, easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M20 15.5a2.5 2.5 0 0 0-2.5-2.5h-11A2.5 2.5 0 0 0 4 15.5V17a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.46, 0.6, 0.78], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <path d="M5 22h14" />
    </svg>
  )
}

export const meta = {
  name: 'stamp',
  gesture: 'it comes down firm',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['approve', 'seal'],
}

export default StampIcon
