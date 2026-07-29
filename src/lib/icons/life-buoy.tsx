import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Life buoy — it is thrown. The ring turns a free 90° about its own center
 * — the four-fold cross pattern makes that a symmetric landing — spinning
 * at a constant rate the way anything actually in flight does, while it
 * arcs up and falls back down under gravity — help on the way.
 * Base geometry: Lucide `life-buoy` (ISC).
 */
const DUR = 0.9

export function LifeBuoyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'life buoy'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 90],
            y: [0, -1.5, 0],
            transition: {
              duration: DUR,
              rotate: { ease: 'linear' },
              y: { times: [0, 0.4, 1], ease: [easeOutQuart, gravity] },
            },
          },
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m4.93 4.93 4.24 4.24" />
        <path d="m14.83 9.17 4.24-4.24" />
        <path d="m14.83 14.83 4.24 4.24" />
        <path d="m9.17 14.83-4.24 4.24" />
        <circle cx="12" cy="12" r="4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'life-buoy',
  gesture: 'it is thrown',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['help', 'rescue', 'support', 'life', 'buoy'],
}

export default LifeBuoyIcon
