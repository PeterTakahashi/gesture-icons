import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Sun moon — both halves perform their own verb. The three remaining rays
 * (this glyph only draws a quarter-turn of sun's full eight) fire outward
 * along their own radius exactly as in sun.tsx, staggered clockwise; the
 * moon/sun swirl body — the accent that makes this glyph read as
 * "moon" — nods off with the same sleepy tilt as moon.tsx.
 * Base geometry: Lucide `sun-moon` (ISC).
 */
const DUR = 1.0

const RAYS = [
  { d: 'M12 2v2', delay: 0 },
  { d: 'm19 5-1.256 1.256', delay: 0.03 },
  { d: 'M20 12h2', delay: 0.06 },
]

export function SunMoonIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sun moon'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, -12, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.62, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715" />
        <path d="M16 12a4 4 0 0 0-4-4" />
      </motion.g>
      {RAYS.map((ray) => (
        <motion.path
          key={ray.d}
          d={ray.d}
          style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1.35, 1],
              transition: { duration: DUR, delay: ray.delay, times: [0, 0.4, 1], ease: [easeOutQuart, easeInOutCubic] },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'sun-moon',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'sun', 'moon'],
}

export default SunMoonIcon
