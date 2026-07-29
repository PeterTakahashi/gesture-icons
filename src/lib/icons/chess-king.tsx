import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Chess king — one dignified step: a measured lift, a short move forward
 * at the top of the step, a set-down, and a slower return home. No
 * overshoot — the king does not hurry. The base stays planted.
 * Base geometry: Lucide `chess-king` (ISC).
 */
const DUR = 1.15

export function ChessKingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chess king'}
      {...hoverProps}
    >
      <path d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0, 1.1, 1.1, 0],
            y: [0, -1, -1, 0, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m6.7 18-1-1C4.35 15.682 3 14.09 3 12a5 5 0 0 1 4.95-5c1.584 0 2.7.455 4.05 1.818C13.35 7.455 14.466 7 16.05 7A5 5 0 0 1 21 12c0 2.082-1.359 3.673-2.7 5l-1 1" />
        <path d="M10 4h4" />
        <path d="M12 2v6.818" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'chess-king',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['chess', 'game', 'strategy', 'king'],
}

export default ChessKingIcon
