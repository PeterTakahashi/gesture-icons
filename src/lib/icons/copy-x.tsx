import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Copy x — it refuses. VARIANT(x): only the X shakes "no" — a decaying
 * rotation about its own center (15px, 15px, the midpoint of its two
 * diagonals) — while the front sheet and the back sheet hold perfectly
 * still.
 * Base geometry: Lucide `copy-x` (ISC).
 */
const DUR = 0.85

export function CopyXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'copy x'}
      {...hoverProps}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '15px 15px' }}
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
        <line x1="12" x2="18" y1="12" y2="18" />
        <line x1="12" x2="18" y1="18" y2="12" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'copy-x',
  gesture: 'it refuses',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['cancel', 'remove', 'copy'],
}

export default CopyXIcon
