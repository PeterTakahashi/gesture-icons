import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Tablet — picked up and turned to face you: a gentle presentation
 * tilt with a small lift in scale, then set back down flat.
 * Base geometry: Lucide `tablet` (ISC).
 */
const DUR = 0.9

export function TabletIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tablet'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scale: 1 },
          animate: {
            rotate: [0, -4, 2, 0],
            scale: [1, 1.03, 1],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.32, 0.66, 1], ease: easeInOutCubic },
              scale: { times: [0, 0.4, 1], ease: easeOutQuart },
            },
          },
        }}
      >
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
        <line x1="12" x2="12.01" y1="18" y2="18" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'tablet',
  gesture: 'it turns to face you',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['ipad', 'mobile'],
}

export default TabletIcon
