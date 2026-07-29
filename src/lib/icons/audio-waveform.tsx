import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Audio waveform — it does what it means. VARIANT(waves/audio-lines):
 * Lucide draws this waveform as one continuous connected path, so unlike
 * audio-lines' independent bars it carries its verb as a single rigid
 * part — an amplitude pulse about its own centerline, levels dancing,
 * landing exactly at rest.
 * Base geometry: Lucide `audio-waveform` (ISC).
 */
const DUR = 1.0

export function AudioWaveformIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'audio waveform'}
      {...hoverProps}
    >
      <motion.path
        d="M2 13a2 2 0 0 0 2-2V7a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0V4a2 2 0 0 1 4 0v13a2 2 0 0 0 4 0v-4a2 2 0 0 1 2-2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.3, 0.85, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'audio-waveform',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['wave', 'signal', 'audio', 'waveform'],
}

export default AudioWaveformIcon
