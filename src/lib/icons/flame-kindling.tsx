import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Flame kindling — VARIANT(flame): the fire catches. The flame flickers
 * exactly as in `flame` — an uneven scaleY stretch-and-squash with a
 * matching rotational wobble, anchored at its base — while the crossed
 * kindling sticks beneath it hold perfectly still: it takes.
 * Base geometry: Lucide `flame-kindling` (ISC).
 */
const DUR = 0.85

export function FlameKindlingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'flame kindling'}
      {...hoverProps}
    >
      <motion.path
        d="M12 2c1 3 2.5 3.5 3.5 4.5A5 5 0 0 1 17 10a5 5 0 1 1-10 0c0-.3 0-.6.1-.9a2 2 0 1 0 3.3-2C8 4.5 11 2 12 2Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1, rotate: 0 },
          animate: {
            scaleY: [1, 1.08, 0.95, 1.05, 1],
            rotate: [0, -3, 2.5, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.46, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="m5 22 14-4" />
      <path d="m5 18 14 4" />
    </svg>
  )
}

export const meta = {
  name: 'flame-kindling',
  gesture: 'the fire catches',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['camp', 'fire', 'start'],
}

export default FlameKindlingIcon
