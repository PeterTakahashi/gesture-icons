import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Newspaper — the news lands. It lifts a hair (the toss), falls with real
 * gravity, and slaps flat past its resting plane before the stiff paper
 * settles — a hard stop, not a soft bounce. The whole sheet, headline box
 * included, moves as one rigid block: it just landed on the doorstep.
 * Base geometry: Lucide `newspaper` (ISC).
 */
const DUR = 0.85

export function NewspaperIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'newspaper'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2.5, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.62, 0.85], ease: [easeOutQuart, gravity, easeOutQuart] },
          },
        }}
      >
        <path d="M15 18h-5" />
        <path d="M18 14h-8" />
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
        <rect width="8" height="4" x="10" y="6" rx="1" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'newspaper',
  gesture: 'the news lands',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['press', 'article', 'daily'],
}

export default NewspaperIcon
