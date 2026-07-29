import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Chess rook — a straight, mechanical slide sideways and back — no
 * diagonal, no arc, the way a castle only ever moves in a line. The base
 * stays planted.
 * Base geometry: Lucide `chess-rook` (ISC).
 */
const DUR = 0.9

export function ChessRookIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chess rook'}
      {...hoverProps}
    >
      <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.6, 2.5, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.6, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M10 2v2" />
        <path d="M14 2v2" />
        <path d="m17 18-1-9" />
        <path d="M6 2v5a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2" />
        <path d="M6 4h12" />
        <path d="m7 18 1-9" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'chess-rook',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['chess', 'game', 'strategy', 'rook'],
}

export default ChessRookIcon
