import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Glasses — they are adjusted. The whole pair lifts and tips a hair, as if
 * pushed back up the nose, then settles back down under its own weight —
 * one adjust, landing exactly on Lucide's resting glasses.
 * Base geometry: Lucide `glasses` (ISC).
 */
const DUR = 0.9

export function GlassesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'glasses'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -1, -1, 0],
            rotate: [0, -2, -2, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.55, 0.85], ease: [easeOutQuart, 'linear', gravity] },
          },
        }}
      >
        <circle cx="6" cy="15" r="4" />
        <circle cx="18" cy="15" r="4" />
        <path d="M14 15a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
        <path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" />
        <path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'glasses',
  gesture: 'they are adjusted',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['vision', 'read'],
}

export default GlassesIcon
