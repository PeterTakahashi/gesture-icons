import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Chess bishop — the piece makes its diagonal slide and returns. The body
 * winds up a hair against the move, then glides diagonally up-right, and
 * settles back onto the base, which stays planted throughout.
 * Base geometry: Lucide `chess-bishop` (ISC).
 */
const DUR = 0.95

export function ChessBishopIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chess bishop'}
      {...hoverProps}
    >
      <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.5, 2, 0],
            y: [0, 0.5, -2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.6, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M15 18c1.5-.615 3-2.461 3-4.923C18 8.769 14.5 4.462 12 2 9.5 4.462 6 8.77 6 13.077 6 15.539 7.5 17.385 9 18" />
        <path d="m16 7-2.5 2.5" />
        <path d="M9 2h6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'chess-bishop',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['chess', 'game', 'strategy', 'bishop'],
}

export default ChessBishopIcon
