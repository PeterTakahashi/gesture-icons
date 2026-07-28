import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, windupOvershoot } from '../core/easings'

/**
 * Watch — it ticks a second. The hand turns a full 360° about the dial
 * center with a small wind-up and an overshoot before it settles; 360° and
 * 0° are the identical picture, so the turn is free. Case and strap never
 * move — only the hand marks the passing second.
 * Base geometry: Lucide `watch` (ISC).
 */
const DUR = 1.0

export function WatchIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'watch'}
      {...hoverProps}
    >
      <path d="m16.13 7.66-.81-4.05a2 2 0 0 0-2-1.61h-2.68a2 2 0 0 0-2 1.61l-.78 4.05" />
      <path d="m7.88 16.36.8 4a2 2 0 0 0 2 1.61h2.72a2 2 0 0 0 2-1.61l.81-4.05" />
      <circle cx="12" cy="12" r="6" />
      <motion.path
        d="M12 10v2.2l1.6 1"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            // one lap of the dial: 360° is pixel-identical to 0°, so the landing is free
            rotate: [0, -9, 378, 360],
            transition: { duration: DUR, times: [0, 0.14, 0.82, 1], ease: [windupOvershoot, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'watch',
  gesture: 'it ticks a second',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['time', 'wrist'],
}

export default WatchIcon
