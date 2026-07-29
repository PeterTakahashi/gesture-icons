import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Map minus — one is removed. The minus bar is escorted along its own
 * horizontal axis — a small wind-up back, a push out, and home — while
 * the map body and its fold lines hold completely still.
 * Base geometry: Lucide `map-minus` (ISC).
 */
const DUR = 0.8

export function MapMinusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'map minus'}
      {...hoverProps}
    >
      <path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V14" />
      <path d="M15 5.764V14" />
      <path d="M9 3.236v15" />
      <motion.path
        d="M21 18h-6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.4, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 0.9], ease: [easeInOutCubic, [0.5, 0, 0.2, 1.15], easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'map-minus',
  gesture: 'one is removed',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['remove', 'map', 'minus'],
}

export default MapMinusIcon
