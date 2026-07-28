import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Expand — it spreads to fill. All four corner marks NUDGE outward along
 * their own diagonal at once — no stagger, one breath outward — wind up
 * inward, drive out past the mark, settle back home.
 * Base geometry: Lucide `expand` (ISC).
 */
const DUR = 0.75
const D = 0.7071
const DRIVE = 2
const WIND = 0.55

const corner = (sx: number, sy: number) => ({
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, -WIND * D * sx, DRIVE * D * sx, 0],
    y: [0, -WIND * D * sy, DRIVE * D * sy, 0],
    transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
  },
})

export function ExpandIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'expand'}
      {...hoverProps}
    >
      <motion.g initial="normal" animate={controls} variants={corner(1, 1)}>
        <path d="m15 15 6 6" />
        <path d="M21 16v5h-5" />
      </motion.g>
      <motion.g initial="normal" animate={controls} variants={corner(1, -1)}>
        <path d="m15 9 6-6" />
        <path d="M21 8V3h-5" />
      </motion.g>
      <motion.g initial="normal" animate={controls} variants={corner(-1, 1)}>
        <path d="M3 16v5h5" />
        <path d="m3 21 6-6" />
      </motion.g>
      <motion.g initial="normal" animate={controls} variants={corner(-1, -1)}>
        <path d="M3 8V3h5" />
        <path d="M9 9 3 3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'expand',
  gesture: 'it spreads to fill',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['grow', 'fullscreen'],
}

export default ExpandIcon
