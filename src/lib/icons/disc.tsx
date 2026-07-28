import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart } from '../core/easings'

/**
 * Disc — it spins up. One full revolution about center, slow-fast-slow.
 * The turn is free: 360° is the identical picture Lucide drew, so landing
 * back on rotate 0 costs nothing — but the off-center label marks are what
 * make the spin actually readable while it's happening.
 * Base geometry: Lucide `disc-3` (ISC).
 */
const DUR = 1.2

export function DiscIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'disc'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 360],
            transition: { duration: DUR, ease: easeInOutQuart },
          },
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M6 12c0-1.7.7-3.2 1.8-4.2" />
        <circle cx="12" cy="12" r="2" />
        <path d="M18 12c0 1.7-.7 3.2-1.8 4.2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'disc',
  gesture: 'it spins up',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['vinyl', 'record', 'dj'],
}

export default DiscIcon
