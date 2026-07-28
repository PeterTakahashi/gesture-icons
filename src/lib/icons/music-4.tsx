import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Music 4 — the pair keeps time. The whole beamed pair sways about the
 * left head, decaying like a metronome; the right head repeats the same
 * swing 5% late, about the same pivot — the beam reads as flexing because
 * the far end lags the near one, not because it bends.
 * Base geometry: Lucide `music-4` (ISC).
 */
const DUR = 1.0
const LAG = DUR * 0.05

export function Music4Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'music notes'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -7, 5, -2, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.46, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M9 18V5l12-2v13" />
        <path d="m9 9 12-2" />
        <circle cx="6" cy="18" r="3" />
      </motion.g>
      {/* the far head — same swing, same pivot, a beat late */}
      <motion.circle
        cx="18" cy="16" r="3"
        style={{ transformBox: 'view-box', transformOrigin: '6px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -7, 5, -2, 0],
            transition: { duration: DUR, delay: LAG, times: [0, 0.22, 0.46, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'music-4',
  gesture: 'the pair keeps time',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['song', 'audio', 'duet'],
}

export default Music4Icon
