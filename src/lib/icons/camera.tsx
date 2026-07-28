import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Camera — it takes the shot. The body takes a quick press first, then the
 * lens contracts hard and reopens — the shutter snapping, on the same clock
 * so the press hands off directly into the click.
 * Base geometry: Lucide `camera` (ISC).
 */
const DUR = 0.85

export function CameraIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'camera'}
      {...hoverProps}
    >
      <motion.path
        d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.3], ease: [easeInCubic, easeOutQuart] },
          },
        }}
      />
      <motion.circle
        cx="12" cy="13" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.72, 1.08, 1],
            transition: {
              duration: DUR,
              times: [0, 0.38, 0.49, 0.68, 1],
              ease: ['linear', easeInCubic, settleBack, easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'camera',
  gesture: 'it takes the shot',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['photo', 'shutter', 'snap'],
}

export default CameraIcon
