import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { settleBack, easeOutQuart } from '../core/easings'

/**
 * Grip — the dots do a wave. Each row pops a beat after the one above it —
 * 40ms of stagger — a texture you can grab, never a synced blink. Every dot
 * lands back at its resting size.
 * Base geometry: Lucide `grip` (ISC).
 */
const DUR = 0.55
const ROW_STAGGER = 0.04

const DOTS: { cx: number; cy: number; row: number }[] = [
  { cx: 12, cy: 5, row: 0 }, { cx: 19, cy: 5, row: 0 }, { cx: 5, cy: 5, row: 0 },
  { cx: 12, cy: 12, row: 1 }, { cx: 19, cy: 12, row: 1 }, { cx: 5, cy: 12, row: 1 },
  { cx: 12, cy: 19, row: 2 }, { cx: 19, cy: 19, row: 2 }, { cx: 5, cy: 19, row: 2 },
]

const pop = (delay: number): Variants => ({
  normal: { scale: 1 },
  animate: {
    scale: [1, 1.35, 1],
    transition: { duration: DUR, delay, times: [0, 0.4, 1], ease: [settleBack, easeOutQuart] },
  },
})

export function GripIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'grip'}
      {...hoverProps}
    >
      {DOTS.map((d) => (
        <motion.circle
          key={`${d.cx}-${d.cy}`}
          cx={d.cx} cy={d.cy} r="1"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={pop(d.row * ROW_STAGGER)}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'grip',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['drag', 'handle', 'grip'],
}

export default GripIcon
