import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Sun — it shines out. Each of the eight rays sits exactly on its own radius
 * from the disc's center, so scaling it about that shared center stretches
 * it straight outward along its own axis with no tangential drift; the rays
 * fire clockwise from twelve o'clock while the disc itself breathes once.
 * Base geometry: Lucide `sun` (ISC).
 */
const DUR = 1.0

const RAYS = [
  { d: 'M12 2v2', delay: 0 },
  { d: 'm19.07 4.93-1.41 1.41', delay: 0.03 },
  { d: 'M20 12h2', delay: 0.06 },
  { d: 'm17.66 17.66 1.41 1.41', delay: 0.09 },
  { d: 'M12 20v2', delay: 0.12 },
  { d: 'm6.34 17.66-1.41 1.41', delay: 0.15 },
  { d: 'M2 12h2', delay: 0.18 },
  { d: 'm4.93 4.93 1.41 1.41', delay: 0.21 },
]

export function SunIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sun'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" cy="12" r="4"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.35, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
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
  name: 'sun',
  gesture: 'it shines out',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'light', 'day', 'bright'],
}

export default SunIcon
