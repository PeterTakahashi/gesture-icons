import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Videotape — it rewinds. The two reels pulse alternately, left then right
 * then left then right, the spin of tape reeling backward, then a hard stop
 * — the whole body taking a small dip on impact. Be kind, rewind.
 * Base geometry: Lucide `videotape` (ISC).
 */
const DUR = 1.0

export function VideotapeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'videotape'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.7, 0.84, 1], ease: ['linear', easeInCubic, easeOutQuart] },
          },
        }}
      >
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="M2 8h20" />
        <motion.circle
          cx="8" cy="14" r="2"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1.3, 1, 1.3, 1, 1],
              transition: { duration: DUR, times: [0, 0.1, 0.2, 0.4, 0.5, 0.7], ease: easeInOutCubic },
            },
          }}
        />
        <path d="M8 12h8" />
        <motion.circle
          cx="16" cy="14" r="2"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1, 1.3, 1, 1.3, 1],
              transition: { duration: DUR, times: [0, 0.15, 0.25, 0.45, 0.55, 0.7], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'videotape',
  gesture: 'it rewinds',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['vhs', 'retro', 'tape', 'videotape'],
}

export default VideotapeIcon
