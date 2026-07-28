import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Droplet — it drips. Surface tension letting go and recovering: the drop
 * stretches from its top tip — the point it hangs from — through a decaying
 * wobble back to its resting shape.
 * Base geometry: Lucide `droplet` (ISC).
 */
const DUR = 1.0

export function DropletIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'droplet'}
      {...hoverProps}
    >
      <motion.path
        d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.12, 0.94, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.42, 0.66, 0.84, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'droplet',
  gesture: 'it drips',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['water', 'liquid', 'drop', 'rain'],
}

export default DropletIcon
