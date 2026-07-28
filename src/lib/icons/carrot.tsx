import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic, gravity } from '../core/easings'

/**
 * Carrot — it is pulled up. The whole carrot lifts with a wiggle — coming
 * loose from soil — then is pushed firmly back past rest and settles,
 * re-planted.
 * Base geometry: Lucide `carrot` (ISC).
 */
const DUR = 1.0

export function CarrotIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'carrot'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -2, -2, 0.5, 0],
            rotate: [0, 3, -2, 1, 0],
            transition: {
              duration: DUR,
              y: { times: [0, 0.3, 0.55, 0.8, 1], ease: [easeOutQuart, 'linear', gravity, easeOutQuart] },
              rotate: { times: [0, 0.2, 0.4, 0.6, 1], ease: easeInOutCubic },
            },
          },
        }}
      >
        <path d="M15 16a1 1 0 0 0-7-7q-4 4-5.987 12.385a.5.5 0 0 0 .602.602Q11 20 15 16l-3-3" />
        <path d="M15 9q4 4 7 0-3-4-7 0 4-4 0-7-4 3 0 7" />
        <path d="m8 15-2.58-2.58" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'carrot',
  gesture: 'it is pulled up',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['vegetable', 'garden'],
}

export default CarrotIcon
