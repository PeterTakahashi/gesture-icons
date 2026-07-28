import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart, pen } from '../core/easings'

/**
 * User check — they are approved. The check erases and pen-redraws while
 * the person gives a small dip bow exactly as the pen lands — approval
 * received with a nod.
 * Base geometry: Lucide `user-check` (ISC).
 */
const DUR = 1.0

export function UserCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user check'}
      {...hoverProps}
    >
      <motion.path
        d="m16 11 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.4, 0.75], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.75, 0.95], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'user-check',
  gesture: 'they are approved',
  family: 'draw-on' as const,
  section: 'Security',
  tags: ['member', 'verified'],
}

export default UserCheckIcon
