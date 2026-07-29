import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Metronome — it keeps time. The arm (the diagonal pendulum plus the small
 * tick that rides it) swings about the base of the frame, the pivot a real
 * metronome's arm hinges from. Even amplitude each excursion — no decay —
 * because a metronome does not tire, and it lands home on the beat.
 * Base geometry: Lucide `metronome` (ISC).
 */
const DUR = 1.0

export function MetronomeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'metronome'}
      {...hoverProps}
    >
      {/* the arm hinges at its base (12,17) — even swings, no decay, strict tempo */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -15, 15, -15, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.45, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 11.4V9.1" />
        <path d="m12 17 6.59-6.59" />
      </motion.g>
      <path d="m15.05 5.7-.218-.691a3 3 0 0 0-5.663 0L4.418 19.695A1 1 0 0 0 5.37 21h13.253a1 1 0 0 0 .951-1.31L18.45 16.2" />
      <circle cx="20" cy="9" r="2" />
    </svg>
  )
}

export const meta = {
  name: 'metronome',
  gesture: 'it keeps time',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['tempo', 'music', 'rhythm', 'metronome'],
}

export default MetronomeIcon
