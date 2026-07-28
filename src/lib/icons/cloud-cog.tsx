import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint } from '../core/easings'

/**
 * Cloud cog — the cloud thinks. Only the six-spoked cog turns, about its own
 * center (12px,17px — the midpoint every spoke tip sits symmetric around).
 * A small wind-up, an overshoot past the mark, and a settle at 60° — one
 * sixth of a turn, the cog's own symmetry, so the landing is free. The
 * cloud itself never moves; it is provisioning, not blowing away.
 * Base geometry: Lucide `cloud-cog` (ISC).
 */
const DUR = 1.0

export function CloudCogIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud cog'}
      {...hoverProps}
    >
      <path d="M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 68, 60],
            transition: { duration: DUR, times: [0, 0.18, 0.75, 1], ease: [easeInOutCubic, easeOutQuint, easeOutQuart] },
          },
        }}
      >
        <path d="m10.852 19.772-.383.924" />
        <path d="m13.148 14.228.383-.923" />
        <path d="M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923" />
        <path d="m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544" />
        <path d="m14.772 15.852.923-.383" />
        <path d="m14.772 18.148.923.383" />
        <path d="m9.228 15.852-.923-.383" />
        <path d="m9.228 18.148-.923.383" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'cloud-cog',
  gesture: 'the cloud thinks',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['devops', 'config', 'process'],
}

export default CloudCogIcon
