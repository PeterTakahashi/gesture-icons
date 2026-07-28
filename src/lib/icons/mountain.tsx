import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Mountain — it endures. Almost nothing happens, on purpose: a barely
 * perceptible swell about its own base over a long, slow beat — geologic
 * patience. The one icon in the set whose gesture is stillness barely broken.
 * Base geometry: Lucide `mountain` (ISC).
 */
const DUR = 1.5

export function MountainIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mountain'}
      {...hoverProps}
    >
      <motion.path
        d="m8 3 4 8 5-5 5 15H2L8 3z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.015, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'mountain',
  gesture: 'it endures',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['peak', 'outdoor', 'hike'],
}

export default MountainIcon
