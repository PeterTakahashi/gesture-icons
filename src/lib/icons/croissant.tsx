import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Croissant — fresh from the oven. The whole shape rises a touch about its
 * bottom center, with a tiny counter-rotation as it puffs, then settles —
 * warm and just baked.
 * Base geometry: Lucide `croissant` (ISC).
 */
const DUR = 0.85

export function CroissantIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'croissant'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 1.06, 1],
            rotate: [0, -2, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M10.2 18H4.774a1.5 1.5 0 0 1-1.352-.97 11 11 0 0 1 .132-6.487" />
        <path d="M18 10.2V4.774a1.5 1.5 0 0 0-.97-1.352 11 11 0 0 0-6.486.132" />
        <path d="M18 5a4 3 0 0 1 4 3 2 2 0 0 1-2 2 10 10 0 0 0-5.139 1.42" />
        <path d="M5 18a3 4 0 0 0 3 4 2 2 0 0 0 2-2 10 10 0 0 1 1.42-5.14" />
        <path d="M8.709 2.554a10 10 0 0 0-6.155 6.155 1.5 1.5 0 0 0 .676 1.626l9.807 5.42a2 2 0 0 0 2.718-2.718l-5.42-9.807a1.5 1.5 0 0 0-1.626-.676" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'croissant',
  gesture: 'fresh from the oven',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['bakery', 'breakfast'],
}

export default CroissantIcon
