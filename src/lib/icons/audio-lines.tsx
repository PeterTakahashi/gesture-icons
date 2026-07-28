import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Audio lines — the levels dance. Each bar scales about its own center
 * line, two little wiggles of its own amplitude, staggered so no two
 * bars peak together — one bar of music, never a synced pulse — and
 * every bar lands back at its resting height.
 * Base geometry: Lucide `audio-lines` (ISC).
 */
const DUR = 1.0

const BARS: { d: string; peak1: number; peak2: number; delay: number }[] = [
  { d: 'M2 10v3', peak1: 1.3, peak2: 0.7, delay: 0 },
  { d: 'M6 6v11', peak1: 0.65, peak2: 1.4, delay: 0.07 },
  { d: 'M10 3v18', peak1: 1.45, peak2: 0.8, delay: 0.14 },
  { d: 'M14 8v7', peak1: 0.6, peak2: 1.3, delay: 0.21 },
  { d: 'M18 5v13', peak1: 1.25, peak2: 0.65, delay: 0.28 },
  { d: 'M22 10v3', peak1: 0.75, peak2: 1.35, delay: 0.35 },
]

export function AudioLinesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const bar = (peak1: number, peak2: number, delay: number): Variants => ({
    normal: { scaleY: 1 },
    animate: {
      scaleY: [1, peak1, 1, peak2, 1],
      transition: { duration: DUR, delay, times: [0, 0.24, 0.48, 0.72, 1], ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'audio lines'}
      {...hoverProps}
    >
      {BARS.map((b) => (
        <motion.path
          key={b.d}
          d={b.d}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={bar(b.peak1, b.peak2, b.delay)}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'audio-lines',
  gesture: 'the levels dance',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['sound', 'waveform', 'equalizer'],
}

export default AudioLinesIcon
