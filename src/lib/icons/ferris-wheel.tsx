import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Ferris wheel — it turns a car's worth. The rim, spokes, and hub are
 * six-fold symmetric — a gondola every 60° — so one slow, wound-up turn
 * lands on the same picture it left: one gondola has simply advanced into
 * the boarding position. That boarding gondola and its platform stay put;
 * they're the ground-level view, not the wheel itself.
 * Base geometry: Lucide `ferris-wheel` (ISC).
 */
const DUR = 1.3
const OVERSHOOT_TURN: [number, number, number, number] = [0.5, 0, 0.3, 1.15]

export function FerrisWheelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ferris wheel'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 66, 60],
            transition: { duration: DUR, times: [0, 0.22, 0.7, 1], ease: [easeInOutCubic, OVERSHOOT_TURN, easeOutQuart] },
          },
        }}
      >
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4" />
        <path d="m6.8 15-3.5 2" />
        <path d="m20.7 7-3.5 2" />
        <path d="M6.8 9 3.3 7" />
        <path d="m20.7 17-3.5-2" />
        <path d="M18 18.7a9 9 0 1 0-12 0" />
      </motion.g>
      <path d="m9 22 3-8 3 8" />
      <path d="M8 22h8" />
    </svg>
  )
}

export const meta = {
  name: 'ferris-wheel',
  gesture: "it turns a car's worth",
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['fair', 'ride', 'fun', 'ferris', 'wheel'],
}

export default FerrisWheelIcon
