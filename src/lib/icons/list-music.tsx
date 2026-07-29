import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * List music — VARIANT(list): the rows hold still while the note performs
 * its own verb — a single downbeat bounce (wind up, drive down, settle).
 * The accent here is one note, not several marks, so no stagger applies —
 * it just plays its beat once.
 * Base geometry: Lucide `list-music` (ISC).
 */
const DUR = 0.7

export function ListMusicIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list music'}
      {...hoverProps}
    >
      <path d="M16 5H3" />
      <path d="M11 12H3" />
      <path d="M11 19H3" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 1.8, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M21 16V5" />
        <circle cx="18" cy="16" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'list-music',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['list', 'music'],
}

export default ListMusicIcon
