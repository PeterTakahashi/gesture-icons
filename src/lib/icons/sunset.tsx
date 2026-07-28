import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Sunset — the sun goes down. Mirror of sunrise.tsx: the sun's arc and its
 * rays dip together toward the horizon on a gravity ease, hold at the
 * bottom of the beat, then rise back — the day closing and reopening, for
 * the loop's honesty. The horizon line never moves.
 * Base geometry: Lucide `sunset` (ISC).
 */
const DUR = 1.1

export function SunsetIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sunset'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 2, 2, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.75, 1], ease: [gravity, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="M12 10V2" />
        <path d="m4.93 10.93 1.41 1.41" />
        <path d="M2 18h2" />
        <path d="M20 18h2" />
        <path d="m19.07 10.93-1.41 1.41" />
        <path d="m16 6-4 4-4-4" />
        <path d="M16 18a4 4 0 0 0-8 0" />
      </motion.g>
      <path d="M22 22H2" />
    </svg>
  )
}

export const meta = {
  name: 'sunset',
  gesture: 'the sun goes down',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['evening', 'dusk'],
}

export default SunsetIcon
