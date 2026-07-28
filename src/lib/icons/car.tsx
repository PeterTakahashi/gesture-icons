import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutExpo } from '../core/easings'

/**
 * Car — it revs and rolls. A suspension press first (the rev, weight
 * settling), then the whole body surges forward and rotates a touch about
 * the front wheel as it tips into the move, settling back to rest. Two
 * speed lines stream on behind it while it surges — drawn by dash length,
 * never faded — the same mechanism as cart.tsx.
 * Base geometry: Lucide `car` (ISC).
 */
const DUR = 1.0

export function CarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'car'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '7px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            y: [0, 1, 0, 0, 0],
            x: [0, 0, 0, 2.6, 0],
            rotate: [0, 0, 0, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.14, 0.28, 0.62, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </motion.g>
      {/* speed lines: written on by length while the car surges, erased after */}
      {[{ d: 'M0 11.5h3', delay: 0 }, { d: 'M-1 15h2.6', delay: 0.05 }].map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          strokeWidth={strokeWidth * 0.75}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 0.001, opacity: 0 },
            animate: {
              pathLength: [0.001, 0.001, 1, 1, 0.001, 0.001],
              opacity: [0, 0, 1, 1, 0, 0],
              transition: {
                duration: DUR,
                delay: l.delay,
                pathLength: { times: [0, 0.26, 0.4, 0.6, 0.76, 1], ease: ['linear', easeOutExpo, 'linear', easeInOutCubic, 'linear'] },
                opacity: { times: [0, 0.25, 0.26, 0.75, 0.76, 1], ease: 'linear' },
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'car',
  gesture: 'it revs and rolls',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['vehicle', 'drive', 'auto'],
}

export default CarIcon
