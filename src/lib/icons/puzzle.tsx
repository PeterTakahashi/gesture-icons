import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Puzzle — the piece clicks in. A wind-up away, an approach that almost
 * seats, a beat of hesitation, then it drives past the seam and settles
 * back into place — the two-stage insert of a piece finding its click.
 * It returns to rest exactly where it started, the way a demonstration
 * gesture always does.
 * Base geometry: Lucide `puzzle` (ISC).
 */
const DUR = 1.0

export function PuzzleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'puzzle'}
      {...hoverProps}
    >
      <motion.path
        d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 1.5, 1.5, 2.1, 1.8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.32, 0.42, 0.56, 0.68, 1],
              ease: [easeInCubic, easeInOutCubic, 'linear', settleBack, easeOutQuart, easeInOutCubic],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'puzzle',
  gesture: 'the piece clicks in',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['jigsaw', 'fit', 'solve'],
}

export default PuzzleIcon
