import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Hop — a cone in the breeze. The tiny tendril stub at the top-left corner
 * is the stem — it doesn't move. Everything it holds up (the cone's body
 * and its small leaf marks) swings from that point, decaying; the single
 * farthest leaf tip carries its own lagging echo of the same swing, set off
 * a beat later, the way a loose end chases the branch it's hung from.
 * Base geometry: Lucide `hop` (ISC).
 */
const DUR = 1.1

export function HopIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hop'}
      {...hoverProps}
    >
      <path d="M4.93 4.93 3 3a.7.7 0 0 1 0-1" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '4px 4px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -7, 5, -2, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.48, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10.82 16.12c1.69.6 3.91.79 5.18.85.55.03 1-.42.97-.97-.06-1.27-.26-3.5-.85-5.18" />
        <path d="M11.5 6.5c1.64 0 5-.38 6.71-1.07.52-.2.55-.82.12-1.17A10 10 0 0 0 4.26 18.33c.35.43.96.4 1.17-.12.69-1.71 1.07-5.07 1.07-6.71 1.34.45 3.1.9 4.88.62a.88.88 0 0 0 .73-.74c.3-2.14-.15-3.5-.61-4.88" />
        <path d="M15.62 16.95c.2.85.62 2.76.5 4.28a.77.77 0 0 1-.9.7 16.64 16.64 0 0 1-4.08-1.36" />
        <path d="M16.94 15.62c.86.2 2.77.62 4.29.5a.77.77 0 0 0 .7-.9 16.64 16.64 0 0 0-1.36-4.08" />
        <path d="M17.99 5.52a20.82 20.82 0 0 1 3.15 4.5.8.8 0 0 1-.68 1.13c-2.33.2-5.3-.32-8.27-1.57" />
        <path d="M9.58 12.18c1.24 2.98 1.77 5.95 1.57 8.28a.8.8 0 0 1-1.13.68 20.82 20.82 0 0 1-4.5-3.15" />
        <motion.path
          d="M16.13 21.05c1.65.63 3.68.84 4.87.91a.9.9 0 0 0 .96-.96 17.68 17.68 0 0 0-.9-4.87"
          style={{ transformBox: 'view-box', transformOrigin: '16px 21px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -9, 6, -2.5, 0],
              transition: { duration: DUR, delay: DUR * 0.03, times: [0, 0.22, 0.48, 0.72, 1], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'hop',
  gesture: 'the brew bittersweets',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['beer', 'plant', 'hop'],
}

export default HopIcon
