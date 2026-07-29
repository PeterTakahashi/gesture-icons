import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Roller coaster — the car takes the drop. Lucide's glyph has no separate
 * car mark, only the track line and its support poles, so the car is a
 * secondary dot: rest-hidden at scale 0.001 at the station, it pops in,
 * climbs the first rise, dips hard with gravity through the hollow, climbs
 * back out on an ease-out, then pops hidden again as it enters the loop.
 * The poles and track never move.
 * Base geometry: Lucide `roller-coaster` (ISC).
 */
const DUR = 1.0

export function RollerCoasterIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'roller coaster'}
      {...hoverProps}
    >
      <path d="M6 19V5" />
      <path d="M10 19V6.8" />
      <path d="M14 19v-7.8" />
      <path d="M18 5v4" />
      <path d="M18 19v-6" />
      <path d="M22 19V9" />
      <path d="M2 19V9a4 4 0 0 1 4-4c2 0 4 1.33 6 4s4 4 6 4a4 4 0 1 0-3-6.65" />
      <motion.circle
        r={1.3}
        fill={color === 'currentColor' ? 'currentColor' : color}
        stroke="none"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { cx: 2, cy: 19, scale: 0.001 },
          animate: {
            cx: [2, 2, 7, 11, 15, 15],
            cy: [19, 19, 6, 8, 5, 5],
            scale: [0.001, 1, 1, 1, 1, 0.001],
            transition: {
              duration: DUR,
              times: [0, 0.1, 0.42, 0.58, 0.82, 1],
              ease: [easeOutQuart, easeOutQuart, gravity, easeOutQuart, 'linear'],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'roller-coaster',
  gesture: 'the car takes the drop',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['ride', 'thrill', 'fair', 'roller', 'coaster'],
}

export default RollerCoasterIcon
