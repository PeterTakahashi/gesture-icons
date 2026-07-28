import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart } from '../core/easings'

/**
 * Film — the reel advances. The sprocket holes nudge down one frame,
 * left column first, right column 30ms behind; the return snap is hidden
 * behind a hard opacity gate timed to the jump — a projector shutter
 * blinding the pulldown, never a fade. The frame border holds still.
 * Base geometry: Lucide `film` (ISC).
 */
const DUR = 0.9

export function FilmIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const column = (delay: number): Variants => ({
    normal: { y: 0, opacity: 1 },
    animate: {
      y: [0, 1.5, 1.5, 0, 0],
      opacity: [1, 1, 0, 0, 1, 1],
      transition: {
        duration: DUR,
        delay,
        y: { times: [0, 0.34, 0.48, 0.52, 1], ease: [easeOutQuart, 'linear' as const, 'linear' as const, easeOutQuart] },
        opacity: { times: [0, 0.46, 0.48, 0.52, 0.54, 1], ease: 'linear' as const },
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'film'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M17 3v18" />
      <path d="M3 12h18" />
      <motion.g initial="normal" animate={controls} variants={column(0)}>
        <path d="M3 7.5h4" />
        <path d="M3 16.5h4" />
      </motion.g>
      <motion.g initial="normal" animate={controls} variants={column(0.03)}>
        <path d="M17 7.5h4" />
        <path d="M17 16.5h4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'film',
  gesture: 'the reel advances',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['movie', 'cinema', 'frame'],
}

export default FilmIcon
