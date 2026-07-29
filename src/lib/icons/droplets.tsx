import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Droplets — they drip in turn. VARIANT(droplet): the same surface-tension
 * stretch as the single droplet, run on each drop from its own hanging tip
 * — the bigger drop lets go first, the smaller one follows 10% later.
 * Base geometry: Lucide `droplets` (ISC).
 */
const DUR = 1.0

export function DropletsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const drip = (delay: number) => ({
    normal: { scaleY: 1 },
    animate: {
      scaleY: [1, 1.12, 0.94, 1.03, 1],
      transition: { duration: DUR, delay, times: [0, 0.42, 0.66, 0.84, 1], ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'droplets'}
      {...hoverProps}
    >
      <motion.path
        d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"
        style={{ transformBox: 'view-box', transformOrigin: '7px 5.3px' }}
        initial="normal"
        animate={controls}
        variants={drip(0)}
      />
      <motion.path
        d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"
        style={{ transformBox: 'view-box', transformOrigin: '14px 3.02px' }}
        initial="normal"
        animate={controls}
        variants={drip(DUR * 0.1)}
      />
    </svg>
  )
}

export const meta = {
  name: 'droplets',
  gesture: 'they drip in turn',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['water', 'wet', 'droplets'],
}

export default DropletsIcon
