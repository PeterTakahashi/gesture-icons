import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Binary — the bits flip. The two rounded "0" digits blink off and back
 * first, then the two "1" strokes blink off and back — a hard opacity gate
 * each time, never a fade, reading as the bits flipping in sequence before
 * settling back to the resting glyph (all four digits drawn as usual).
 * Base geometry: Lucide `binary` (ISC).
 */
const DUR = 1.0

export function BinaryIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'binary'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1],
            transition: { duration: DUR, times: [0, 0.08, 0.09, 0.24, 0.25, 1], ease: 'linear' },
          },
        }}
      >
        <rect x="14" y="14" width="4" height="6" rx="2" />
        <rect x="6" y="4" width="4" height="6" rx="2" />
      </motion.g>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.3, 0.31, 0.4, 0.41, 0.56, 0.57, 1],
              ease: 'linear',
            },
          },
        }}
      >
        <path d="M6 20h4" />
        <path d="M14 10h4" />
        <path d="M6 14h2v6" />
        <path d="M14 4h2v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'binary',
  gesture: 'the bits flip',
  family: 'secondary' as const,
  section: 'Charts & math',
  tags: ['code', 'digital', 'data'],
}

export default BinaryIcon
