import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Egg — it wobbles unbroken. The whole shell rocks about the fat end
 * resting on the surface, each rock smaller than the last — precarious,
 * but the shell never breaks.
 * Base geometry: Lucide `egg` (ISC).
 */
const DUR = 0.95

export function EggIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'egg'}
      {...hoverProps}
    >
      <motion.path
        d="M12 2C8 2 4 8 4 14a8 8 0 0 0 16 0c0-6-4-12-8-12"
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 6, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.42, 0.62, 0.82, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'egg',
  gesture: 'it wobbles unbroken',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['breakfast', 'fragile'],
}

export default EggIcon
