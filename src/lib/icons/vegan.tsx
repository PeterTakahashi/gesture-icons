import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Vegan — it sprouts. VARIANT(sprout): the circular band holds still while
 * the V-shaped stem rises with a scaleY lift about its base tip, and the
 * small leaf at its end unfolds rotate ±4 about the point where it attaches
 * — a day's growth in one beat.
 * Base geometry: Lucide `vegan` (ISC).
 */
const DUR = 1.0

export function VeganIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'vegan'}
      {...hoverProps}
    >
      <motion.path
        d="M16 8q6 0 6-6-6 0-6 6"
        style={{ transformBox: 'view-box', transformOrigin: '16px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 4, 0],
            transition: { duration: DUR, times: [0, 0.45, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="M17.41 3.59a10 10 0 1 0 3 3" />
      <motion.path
        d="M2 2a26.6 26.6 0 0 1 10 20c.9-6.82 1.5-9.5 4-14"
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.45, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'vegan',
  gesture: 'it sprouts',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['plant', 'diet', 'green', 'vegan'],
}

export default VeganIcon
