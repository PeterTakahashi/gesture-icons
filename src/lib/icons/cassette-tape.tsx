import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Cassette tape — the spools wind. The two reel circles pulse alternately
 * — left, right, left, right — never together, the way tape actually
 * hands off between hubs. The shell never moves.
 * Base geometry: Lucide `cassette-tape` (ISC).
 */
const DUR = 1.1

export function CassetteTapeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cassette tape'}
      {...hoverProps}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M8 12h8" />
      <motion.circle
        cx="8" cy="10" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.12, 1, 1, 1.12, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.1, 0.22, 0.5, 0.6, 0.72, 1],
              ease: [settleBack, easeOutQuart, 'linear', settleBack, easeOutQuart, 'linear'],
            },
          },
        }}
      />
      <motion.circle
        cx="16" cy="10" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.12, 1, 1, 1.12, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.25, 0.35, 0.47, 0.75, 0.85, 0.97, 1],
              ease: ['linear', settleBack, easeOutQuart, 'linear', settleBack, easeOutQuart, 'linear'],
            },
          },
        }}
      />
      <path d="m6 20 .7-2.9A1.4 1.4 0 0 1 8.1 16h7.8a1.4 1.4 0 0 1 1.4 1l.7 3" />
    </svg>
  )
}

export const meta = {
  name: 'cassette-tape',
  gesture: 'the spools wind',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['retro', 'tape', 'music'],
}

export default CassetteTapeIcon
