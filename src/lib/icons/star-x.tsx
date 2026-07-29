import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Star x — it refuses. VARIANT(x): only the X shakes "no" — a decaying
 * rotation about its own center (18px, 18px, the midpoint of its two
 * diagonals) — while the star body holds perfectly still.
 * Base geometry: Lucide `star-x` (ISC).
 */
const DUR = 0.85

export function StarXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'star x'}
      {...hoverProps}
    >
      <path d="m20.063 11.525 1.777-1.731a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428a2.1 2.1 0 0 1 .987-.243 2 2 0 0 1 .132.004" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 3, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m15.5 15.5 5 5" />
        <path d="m20.5 15.5-5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'star-x',
  gesture: 'it refuses',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['cancel', 'remove', 'star'],
}

export default StarXIcon
