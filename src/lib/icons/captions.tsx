import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Captions — the line updates. The frame and the settled top line never
 * move; only the bottom caption line hard-blinks off and on twice, a true
 * binary swap with no fade — dialogue advancing underneath it.
 * Base geometry: Lucide `captions` (ISC).
 */
const DUR = 0.85

export function CaptionsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'captions'}
      {...hoverProps}
    >
      <rect width="18" height="14" x="3" y="5" rx="2" ry="2" />
      <path d="M7 11h2M13 11h4" />
      <motion.path
        d="M7 15h4M15 15h2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.15, 0.32, 0.33, 0.5, 0.51, 0.68, 0.69, 1],
              ease: 'linear',
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'captions',
  gesture: 'the line updates',
  family: 'secondary' as const,
  section: 'Media',
  tags: ['subtitles', 'accessibility', 'captions'],
}

export default CaptionsIcon
