import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { gravity, easeOutQuart } from '../core/easings'

/**
 * Bird — it hops. Two quick hops about its feet: an almost-instant takeoff
 * up, then gravity takes the fall back down, leaning forward a hair on
 * each — the little forward-lean of a bird hopping along a branch.
 * Base geometry: Lucide `bird` (ISC).
 */
const DUR = 0.9

export function BirdIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bird'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '10px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -1.8, 0, -1.2, 0],
            rotate: [0, 3, 0, 3, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.4, 0.62, 0.82], ease: [easeOutQuart, gravity, easeOutQuart, gravity] },
          },
        }}
      >
        <path d="M16 7h.01" />
        <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
        <path d="m20 7 2 .5-2 .5" />
        <path d="M10 18v3" />
        <path d="M14 17.75V21" />
        <path d="M7 18a6 6 0 0 0 3.84-10.61" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'bird',
  gesture: 'it hops',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['tweet', 'animal', 'fly'],
}

export default BirdIcon
