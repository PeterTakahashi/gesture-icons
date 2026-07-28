import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cake — the candles flicker. Each flame mark stretches tall then short
 * then tall again about its own base, fast and unsynchronized (40ms apart)
 * — make a wish. The cake, frosting, plate and candle sticks never move.
 * Base geometry: Lucide `cake` (ISC).
 */
const DUR = 0.6
const CANDLES: [number, number][] = [
  [7, 4],
  [12, 4],
  [17, 4],
]

export function CakeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const flicker = (delay: number): Variants => ({
    normal: { scaleY: 1 },
    animate: {
      scaleY: [1, 1.2, 0.9, 1.1, 1],
      transition: { duration: DUR, delay, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cake'}
      {...hoverProps}
    >
      <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8" />
      <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1" />
      <path d="M2 21h20" />
      <path d="M7 8v3" />
      <path d="M12 8v3" />
      <path d="M17 8v3" />
      {CANDLES.map(([cx, cy], i) => (
        <motion.path
          key={cx}
          d={`M${cx} ${cy}h.01`}
          style={{ transformBox: 'view-box', transformOrigin: `${cx}px ${cy}px` }}
          initial="normal"
          animate={controls}
          variants={flicker(i * 0.04)}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'cake',
  gesture: 'the candles flicker',
  family: 'secondary' as const,
  section: 'Food & drink',
  tags: ['birthday', 'dessert', 'celebrate'],
}

export default CakeIcon
