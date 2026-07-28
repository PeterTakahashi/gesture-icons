import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Memory stick — it seats in the slot. A press along the module's own axis:
 * a hair of load upward, a first click that almost seats it, a small give,
 * then the second click that seats it fully, and a settle back to rest —
 * a two-stage connector click, not one clean push. The five contact pins
 * along the bottom edge are the part that actually meets the slot, so they
 * lead the body by a beat on every stage.
 * Base geometry: Lucide `memory-stick` (ISC).
 */
const DUR = 0.85

export function MemoryStickIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'memory stick'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -0.3, 1.0, 0.65, 1.5, 0],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.34, 0.46, 0.68, 1],
              ease: [easeInCubic, easeOutQuart, easeInOutCubic, easeOutQuart, settleBack],
            },
          },
        }}
      >
        <rect x="2" y="6" width="20" height="10" rx="2" />
        <path d="M2 11h1.5" />
        <path d="M20.5 11H22" />
        <path d="M8 12v-2" />
        <path d="M12 12v-2" />
        <path d="M16 12v-2" />
      </motion.g>
      {/* the contact pins — they meet the slot first, so they lead every stage */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -0.35, 1.15, 0.75, 1.7, 0],
            transition: {
              duration: DUR,
              times: [0, 0.08, 0.28, 0.4, 0.62, 0.94],
              ease: [easeInCubic, easeOutQuart, easeInOutCubic, easeOutQuart, settleBack],
            },
          },
        }}
      >
        <path d="M4 18v-2" />
        <path d="M8 18v-2" />
        <path d="M12 18v-2" />
        <path d="M16 18v-2" />
        <path d="M20 18v-2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'memory-stick',
  gesture: 'it seats in the slot',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['ram', 'hardware', 'chip'],
}

export default MemoryStickIcon
