import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint } from '../core/easings'

/**
 * Chess queen — a long, elegant glide across the board and back, the
 * farthest-reaching move of any piece. A light lean-back before she
 * commits, then a fast, clean travel and a settled return. The base stays
 * planted.
 * Base geometry: Lucide `chess-queen` (ISC).
 */
const DUR = 1.2

export function ChessQueenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chess queen'}
      {...hoverProps}
    >
      <path d="M4 20a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.3, 1.4, 0],
            y: [0, 0.5, -3, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.6, 1], ease: [easeInOutCubic, easeOutQuint, easeInOutCubic] },
          },
        }}
      >
        <path d="m12.474 5.943 1.567 5.34a1 1 0 0 0 1.75.328l2.616-3.402" />
        <path d="m20 9-3 9" />
        <path d="m5.594 8.209 2.615 3.403a1 1 0 0 0 1.75-.329l1.567-5.34" />
        <path d="M7 18 4 9" />
        <circle cx="12" cy="4" r="2" />
        <circle cx="20" cy="7" r="2" />
        <circle cx="4" cy="7" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'chess-queen',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['chess', 'game', 'strategy', 'queen'],
}

export default ChessQueenIcon
