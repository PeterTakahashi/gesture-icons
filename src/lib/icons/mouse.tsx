import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Mouse — it scrolls. The wheel notch travels down through the body, is
 * repositioned above while it is clipped out of view by the mouse's own
 * outline, and scrolls back down into its resting spot — the wheel turning
 * over, once.
 * Base geometry: Lucide `mouse` (ISC).
 */
const DUR = 1.0

export function MouseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mouse'}
      {...hoverProps}
    >
      <defs>
        <clipPath id="gi-mouse-clip">
          <rect x="5" y="2" width="14" height="20" rx="7" />
        </clipPath>
      </defs>
      <rect x="5" y="2" width="14" height="20" rx="7" />
      <g clipPath="url(#gi-mouse-clip)">
        <motion.path
          d="M12 6v4"
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 14, 14, -10, -10, 0],
              transition: {
                duration: DUR,
                times: [0, 0.32, 0.44, 0.44, 0.5, 1],
                ease: [easeInOutCubic, 'linear', 'linear', 'linear', easeInOutCubic],
              },
            },
          }}
        />
      </g>
    </svg>
  )
}

export const meta = {
  name: 'mouse',
  gesture: 'it scrolls',
  family: 'secondary' as const,
  section: 'Media',
  tags: ['cursor', 'scroll', 'input', 'device'],
}

export default MouseIcon
