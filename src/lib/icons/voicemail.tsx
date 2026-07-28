import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Voicemail — a message waits. The connecting line stays put; the two reel
 * circles pulse in alternation, like tape rolling between them — one saved
 * message.
 * Base geometry: Lucide `voicemail` (ISC).
 */
const DUR = 1.1

export function VoicemailIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'voicemail'}
      {...hoverProps}
    >
      <motion.circle
        cx="6" cy="12" r="4"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.08, 1, 1, 1.08, 1, 1],
            transition: { duration: DUR, times: [0, 0.14, 0.28, 0.5, 0.64, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.circle
        cx="18" cy="12" r="4"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.08, 1, 1.08, 1, 1],
            transition: { duration: DUR, times: [0, 0.39, 0.5, 0.86, 0.97, 1], ease: easeInOutCubic },
          },
        }}
      />
      <line x1="6" x2="18" y1="16" y2="16" />
    </svg>
  )
}

export const meta = {
  name: 'voicemail',
  gesture: 'a message waits',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['message', 'recording'],
}

export default VoicemailIcon
