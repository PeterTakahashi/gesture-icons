import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Rocking chair — it rocks. The whole chair is one rigid body pivoting about
 * the contact point of its rocker arc (the low point of the curve where it
 * meets the ground), decaying through a slow, unhurried arc — an afternoon.
 * Base geometry: Lucide `rocking-chair` (ISC).
 */
const DUR = 1.4

export function RockingChairIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'rocking chair'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -5, 4, -2.5, 1, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.42, 0.62, 0.82, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m15 13 3.708 7.416" />
        <path d="M3 19a15 15 0 0 0 18 0" />
        <path d="m3 2 3.21 9.633A2 2 0 0 0 8.109 13H18" />
        <path d="m9 13-3.708 7.416" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'rocking-chair',
  gesture: 'it rocks',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['furniture', 'porch', 'calm', 'rocking', 'chair'],
}

export default RockingChairIcon
