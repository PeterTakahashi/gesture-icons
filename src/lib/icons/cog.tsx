import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Cog — the gears mesh. Lucide's cog is 12-fold symmetric (a tooth every
 * 30°), so the outer ring's one-tooth turn lands on the same picture it
 * left — wind-up first, then the click. The inner hub counter-rotates a
 * shorter arc on the same clock and returns home, reading as the meshed
 * transmission passing through it (a plain circle has no marks to free-land
 * against, so it resets to 0 rather than landing free like the ring does).
 * Base geometry: Lucide `cog` (ISC).
 */
const DUR = 0.9
const OVERSHOOT_TURN: [number, number, number, number] = [0.5, 0, 0.3, 1.15]

export function CogIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cog'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 34, 30],
            transition: { duration: DUR, times: [0, 0.18, 0.6, 1], ease: [easeInOutCubic, OVERSHOOT_TURN, easeOutQuart] },
          },
        }}
      >
        <path d="M11 10.27 7 3.34" />
        <path d="m11 13.73-4 6.93" />
        <path d="M12 22v-2" />
        <path d="M12 2v2" />
        <path d="M14 12h8" />
        <path d="m17 20.66-1-1.73" />
        <path d="m17 3.34-1 1.73" />
        <path d="M2 12h2" />
        <path d="m20.66 17-1.73-1" />
        <path d="m20.66 7-1.73 1" />
        <path d="m3.34 17 1.73-1" />
        <path d="m3.34 7 1.73 1" />
        <circle cx="12" cy="12" r="8" />
      </motion.g>
      <motion.circle
        cx="12" cy="12" r="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 5, -18, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.62, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cog',
  gesture: 'the gears mesh',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['settings', 'machine', 'cog'],
}

export default CogIcon
