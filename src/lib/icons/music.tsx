import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Music — the note sways. The whole note — stem and both heads — sways
 * about the primary note-head it hangs from, a decaying metronome lilt,
 * each swing smaller than the last.
 * Base geometry: Lucide `music` (ISC).
 */
const DUR = 1.1

export function MusicIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'music'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 6, -3, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.5, 0.74, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'music',
  gesture: 'the note sways',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['song', 'audio', 'note', 'melody'],
}

export default MusicIcon
