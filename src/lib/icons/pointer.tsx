import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Pointer — it taps. The whole hand nudges down fast, hits a hard stop,
 * and settles back up with a small overshoot — one tap.
 * Base geometry: Lucide `pointer` (ISC).
 */
const DUR = 0.7

export function PointerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pointer'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -0.3, 1.5, 1.5, 0],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.32, 0.5, 0.85],
              ease: [easeInOutCubic, easeOutQuart, 'linear', settleBack],
            },
          },
        }}
      >
        <path d="M22 14a8 8 0 0 1-8 8" />
        <path d="M18 11v-1a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1" />
        <path d="M10 9.5V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10" />
        <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'pointer',
  gesture: 'it taps',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['click', 'cursor', 'hand'],
}

export default PointerIcon
