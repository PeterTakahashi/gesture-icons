import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Shrink — it gathers itself. All four corner marks already point inward
 * (their arrowheads sit near the center); each one NUDGEs further along that
 * same inward diagonal — wind up out, drive in past the mark, settle back —
 * no stagger, one breath inward.
 * Base geometry: Lucide `shrink` (ISC).
 */
const DUR = 0.75
const D = 0.7071
const DRIVE = 1.6
const WIND = 0.5

const corner = (sx: number, sy: number) => ({
  normal: { x: 0, y: 0 },
  animate: {
    x: [0, -WIND * D * sx, DRIVE * D * sx, 0],
    y: [0, -WIND * D * sy, DRIVE * D * sy, 0],
    transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
  },
})

export function ShrinkIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shrink'}
      {...hoverProps}
    >
      {/* bottom-right: corner (21,21) toward tip (15,15) — inward is (-1,-1) */}
      <motion.path d="m15 15 6 6m-6-6v4.8m0-4.8h4.8" initial="normal" animate={controls} variants={corner(-1, -1)} />
      {/* bottom-left: corner (3,21) toward tip (9,15) — inward is (1,-1) */}
      <motion.path d="M9 19.8V15m0 0H4.2M9 15l-6 6" initial="normal" animate={controls} variants={corner(1, -1)} />
      {/* top-right: corner (21,3) toward tip (15,9) — inward is (-1,1) */}
      <motion.path d="M15 4.2V9m0 0h4.8M15 9l6-6" initial="normal" animate={controls} variants={corner(-1, 1)} />
      {/* top-left: corner (3,3) toward tip (9,9) — inward is (1,1) */}
      <motion.path d="M9 4.2V9m0 0H4.2M9 9 3 3" initial="normal" animate={controls} variants={corner(1, 1)} />
    </svg>
  )
}

export const meta = {
  name: 'shrink',
  gesture: 'it gathers itself',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['collapse', 'compress'],
}

export default ShrinkIcon
