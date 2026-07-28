import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint, gravity } from '../core/easings'

/**
 * Crown — it is crowned. It rises and tilts slightly as if catching the
 * light, then descends and seats itself with a dignified settle. The line
 * it seats on (head or table) never moves.
 * Base geometry: Lucide `crown` (ISC).
 */
const DUR = 1.1

export function CrownIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'crown'}
      {...hoverProps}
    >
      <motion.path
        d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -2.5, -2.5, 0.6, 0],
            rotate: [0, -3, 3, 0],
            transition: {
              duration: DUR,
              y: { times: [0, 0.26, 0.62, 0.88, 1], ease: [easeOutQuint, 'linear', gravity, easeOutQuart] },
              rotate: { times: [0, 0.3, 0.62, 0.9], ease: easeInOutCubic },
            },
          },
        }}
      />
      <path d="M5 21h14" />
    </svg>
  )
}

export const meta = {
  name: 'crown',
  gesture: 'it is crowned',
  family: 'rigid' as const,
  section: 'People',
  tags: ['king', 'queen', 'royal', 'top', 'best'],
}

export default CrownIcon
