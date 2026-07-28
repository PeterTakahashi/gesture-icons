import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Egg fried — the yolk jiggles. Only the yolk carries the verb: it wobbles
 * about its own center like liquid settling in the pan while the white,
 * already set, holds perfectly still.
 * Base geometry: Lucide `egg-fried` (ISC).
 */
const DUR = 0.65

export function EggFriedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'egg fried'}
      {...hoverProps}
    >
      <motion.circle
        cx="11.5" cy="12.5" r="3.5"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.12, 0.94, 1.05, 1],
            transition: { duration: DUR, times: [0, 0.28, 0.55, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="M3 8c0-3.5 2.5-6 6.5-6 5 0 4.83 3 7.5 5s5 2 5 6c0 4.5-2.5 6.5-7 6.5-2.5 0-2.5 2.5-6 2.5s-7-2-7-5.5c0-3 1.5-3 1.5-5C3.5 10 3 9 3 8Z" />
    </svg>
  )
}

export const meta = {
  name: 'egg-fried',
  gesture: 'the yolk jiggles',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['breakfast', 'cooking'],
}

export default EggFriedIcon
