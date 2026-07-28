import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Map — it unfolds a panel. Lucide draws the trifold outline as one
 * continuous path, so there is no separate "middle panel" shape to scale in
 * isolation; the honest equivalent is the two fold lines themselves pinching
 * toward each other (the panel narrowing), a small overshoot apart, and
 * settling — the crease actually flexing, which is what the spec is really
 * after. The outer outline holds still.
 * Base geometry: Lucide `map` (ISC).
 */
const DUR = 0.9

export function MapIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'map'}
      {...hoverProps}
    >
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <motion.path
        d="M15 5.764v15"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.24, 0.06, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M9 3.236v15"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.24, -0.06, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'map',
  gesture: 'it unfolds a panel',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['directions', 'travel'],
}

export default MapIcon
