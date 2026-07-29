import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Chess knight — the L-hop: up, across, and a gravity landing. The body
 * rises, holds airborne while it hops sideways, then falls back with an
 * accelerating drop and settles home. The base stays planted.
 * Base geometry: Lucide `chess-knight` (ISC).
 */
const DUR = 1.0

export function ChessKnightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chess knight'}
      {...hoverProps}
    >
      <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0, 1.5, 1.5, 0],
            y: [0, -2.5, -2.5, 0, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.5, 0.74, 1], ease: [easeOutQuart, easeInOutCubic, gravity, easeOutQuart] },
          },
        }}
      >
        <path d="M16.5 18c1-2 2.5-5 2.5-9a7 7 0 0 0-7-7H6.635a1 1 0 0 0-.768 1.64L7 5l-2.32 5.802a2 2 0 0 0 .95 2.526l2.87 1.456" />
        <path d="m15 5 1.425-1.425" />
        <path d="m17 8 1.53-1.53" />
        <path d="M9.713 12.185 7 18" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'chess-knight',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['chess', 'game', 'strategy', 'knight'],
}

export default ChessKnightIcon
