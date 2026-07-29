import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Chess pawn — one small step forward. A quick crouch, a short hop up the
 * board, and back down to rest. The smallest, fastest move on the board —
 * the base stays planted.
 * Base geometry: Lucide `chess-pawn` (ISC).
 */
const DUR = 0.75

export function ChessPawnIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chess pawn'}
      {...hoverProps}
    >
      <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.7, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.6, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="m14.5 10 1.5 8" />
        <path d="M7 10h10" />
        <path d="m8 18 1.5-8" />
        <circle cx="12" cy="6" r="4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'chess-pawn',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['chess', 'game', 'strategy', 'pawn'],
}

export default ChessPawnIcon
