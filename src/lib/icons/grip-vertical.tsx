import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { settleBack, easeOutQuart } from '../core/easings'

/**
 * Grip vertical — the dots do a wave. Each column pops 40ms after the one
 * before it — a texture you can grab, never a synced blink. Every dot lands
 * back at its resting size.
 * Base geometry: Lucide `grip-vertical` (ISC).
 */
const DUR = 0.55
const COL_STAGGER = 0.04

const DOTS: { cx: number; cy: number; col: number }[] = [
  { cx: 9, cy: 12, col: 0 }, { cx: 9, cy: 5, col: 0 }, { cx: 9, cy: 19, col: 0 },
  { cx: 15, cy: 12, col: 1 }, { cx: 15, cy: 5, col: 1 }, { cx: 15, cy: 19, col: 1 },
]

const pop = (delay: number): Variants => ({
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.35, 1],
    transition: { duration: DUR, delay, times: [0, 0.4, 1], ease: [settleBack, easeOutQuart] },
  },
})

export function GripVerticalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'grip vertical'}
      {...hoverProps}
    >
      {DOTS.map((d) => (
        <motion.circle
          key={`${d.cx}-${d.cy}`}
          cx={d.cx} cy={d.cy} r="1"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={pop(d.col * COL_STAGGER)}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'grip-vertical',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['drag', 'handle', 'grip', 'vertical'],
}

export default GripVerticalIcon
