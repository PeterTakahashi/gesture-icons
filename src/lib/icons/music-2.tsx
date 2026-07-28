import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Music 2 — the note keeps time. VARIANT(music): the same decaying sway
 * about the note head it hangs from, run slightly quicker — a different
 * tempo, not a different gesture.
 * Base geometry: Lucide `music-2` (ISC).
 */
const DUR = 0.9

export function Music2Icon({
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
        style={{ transformBox: 'view-box', transformOrigin: '8px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 6, -3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.46, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="8" cy="18" r="4" />
        <path d="M12 18V2l7 4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'music-2',
  gesture: 'the note keeps time',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['song', 'audio', 'beat'],
}

export default Music2Icon
