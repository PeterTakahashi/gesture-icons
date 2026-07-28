import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeOutQuint, gravity } from '../core/easings'

/**
 * Anchor — it holds fast. The shaft, stock and flukes lift a touch, then
 * drop past their resting depth under gravity, and bite back up to seat
 * with a hard, firm stop — no wobble, it's set. The ring at the top stays
 * fixed; that's the mounting point, not the part that falls.
 * Base geometry: Lucide `anchor` (ISC).
 */
const DUR = 1.0

export function AnchorIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'anchor'}
      {...hoverProps}
    >
      <circle cx="12" cy="4" r="2" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.5, 2, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.62, 1], ease: [easeOutQuart, gravity, easeOutQuint] },
          },
        }}
      >
        <path d="M12 6v16" />
        <path d="m19 13 2-1a9 9 0 0 1-18 0l2 1" />
        <path d="M9 11h6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'anchor',
  gesture: 'it holds fast',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['hold', 'secure', 'port'],
}

export default AnchorIcon
