import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { gravity, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Anvil — it takes the hammer. An unseen hammer lands: the whole block
 * dips hard and stops (no anvil ever gives more than a millimeter), rebounds
 * a hair past level, then settles. Two spark ticks flick at the strike
 * point on the impact frame itself — never before it — drawn by dash
 * length and gone again in the same beat.
 * Base geometry: Lucide `anvil` (ISC).
 */
const DUR = 0.85

export function AnvilIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'anvil'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, -0.3, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.55, 0.8], ease: [gravity, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M7 10H6a4 4 0 0 1-4-4 1 1 0 0 1 1-1h4" />
        <path d="M7 5a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1 7 7 0 0 1-7 7H8a1 1 0 0 1-1-1z" />
        <path d="M9 12v5" />
        <path d="M15 12v5" />
        <path d="M5 20a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3 1 1 0 0 1-1 1H6a1 1 0 0 1-1-1" />
      </motion.g>
      {/* spark ticks: rest-hidden, flick open only on the impact frame */}
      {[{ d: 'M10.5 2.2 9.6 3.6', delay: 0 }, { d: 'M13.5 2.2 14.4 3.6', delay: 0.02 }].map((s) => (
        <motion.path
          key={s.d}
          d={s.d}
          strokeWidth={strokeWidth * 0.75}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 0.001, opacity: 0 },
            animate: {
              pathLength: [0.001, 0.001, 1, 1, 0.001, 0.001],
              opacity: [0, 0, 1, 1, 0, 0],
              transition: {
                duration: DUR,
                delay: s.delay,
                times: [0, 0.26, 0.3, 0.42, 0.46, 1],
                ease: 'linear',
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'anvil',
  gesture: 'it takes the hammer',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['forge', 'blacksmith', 'anvil'],
}

export default AnvilIcon
