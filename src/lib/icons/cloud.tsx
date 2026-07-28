import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cloud — it drifts. The slowest gesture in the set: a big soft shape eases
 * sideways and gently back, long legs the whole way, big things move slow.
 * Base geometry: Lucide `cloud` (ISC).
 */
const DUR = 1.4

export function CloudIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud'}
      {...hoverProps}
    >
      <motion.path
        d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 2.2, -1.6, 0],
            y: [0, -0.5, 0.3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cloud',
  gesture: 'it drifts',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'sky', 'overcast'],
}

export default CloudIcon
