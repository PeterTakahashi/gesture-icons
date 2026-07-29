import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * List x — it refuses. VARIANT(x): only the X shakes "no" — a decaying
 * rotation about its own center (18px, 12px, the midpoint of its two
 * diagonals) — while the three list lines hold perfectly still.
 * Base geometry: Lucide `list-x` (ISC).
 */
const DUR = 0.85

export function ListXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list x'}
      {...hoverProps}
    >
      <path d="M16 5H3" />
      <path d="M11 12H3" />
      <path d="M16 19H3" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 12px' }}
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
        <path d="m15.5 9.5 5 5" />
        <path d="m20.5 9.5-5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'list-x',
  gesture: 'it refuses',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['cancel', 'remove', 'list'],
}

export default ListXIcon
