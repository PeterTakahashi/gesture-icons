import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint, gravity } from '../core/easings'

/**
 * Coins — they stack up. The top coin (its ring plus its shine mark) lifts
 * and drops back onto the stack; the landing dip propagates to the coin
 * beneath it 3% later, the way one disc actually settles onto another.
 * Base geometry: Lucide `coins` (ISC).
 */
const DUR = 1.0

export function CoinsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'coins'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2.5, -2.5, 0.6, 0],
            transition: {
              duration: DUR,
              times: [0, 0.24, 0.6, 0.85, 1],
              ease: [easeOutQuint, 'linear', gravity, easeOutQuart],
            },
          },
        }}
      >
        <circle cx="16" cy="8" r="6" />
        <path d="M15 6h1v4" />
      </motion.g>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.25, -0.08, 0],
            transition: {
              duration: DUR,
              times: [0, 0.78, 0.88, 0.95, 1],
              ease: ['linear', easeOutQuart, easeInOutCubic],
            },
          },
        }}
      >
        <path d="M13.744 17.736a6 6 0 1 1-7.48-7.48" />
        <path d="m6.134 14.768.866-.5 2 3.464" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'coins',
  gesture: 'they stack up',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['money', 'cash', 'change'],
}

export default CoinsIcon
