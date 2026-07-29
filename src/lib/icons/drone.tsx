import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart } from '../core/easings'

/**
 * Drone — it hovers off. It lifts straight up, holds a two-beat hover
 * wobble with its rotors shivering, then descends to a precise landing with
 * no bounce — a drone corrects its own touchdown, it doesn't bounce on it.
 * Base geometry: Lucide `drone` (ISC).
 */
const DUR = 1.15

export function DroneIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'drone'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -2.5, -2.5, 0],
            rotate: [0, -2, 2, -2, 2, 0, 0],
            transition: {
              duration: DUR,
              y: { times: [0, 0.22, 0.76, 1], ease: [easeOutQuart, 'linear', easeInOutQuart] },
              rotate: { times: [0, 0.32, 0.46, 0.6, 0.74, 0.78, 1], ease: easeInOutCubic },
            },
          },
        }}
      >
        <path d="M10 10 7 7" />
        <path d="m10 14-3 3" />
        <path d="m14 10 3-3" />
        <path d="m14 14 3 3" />
        <rect x="10" y="8" width="4" height="8" rx="1" />
        <motion.g
          initial="normal"
          animate={controls}
          variants={{
            normal: { x: 0 },
            animate: {
              x: [0, 0.5, -0.5, 0.5, -0.5, 0.5, -0.5, 0],
              transition: { duration: DUR, times: [0, 0.24, 0.32, 0.4, 0.48, 0.56, 0.64, 0.76], ease: 'linear' },
            },
          }}
        >
          <path d="M14.205 4.139a4 4 0 1 1 5.439 5.863" />
          <path d="M19.637 14a4 4 0 1 1-5.432 5.868" />
          <path d="M4.367 10a4 4 0 1 1 5.438-5.862" />
          <path d="M9.795 19.862a4 4 0 1 1-5.429-5.873" />
        </motion.g>
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'drone',
  gesture: 'it hovers off',
  family: 'travel' as const,
  section: 'Devices',
  tags: ['quadcopter', 'fly', 'aerial', 'drone'],
}

export default DroneIcon
