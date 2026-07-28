import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cloud moon — the night clouds pass. Only the cloud drifts, long and slow,
 * sliding sideways and back; the moon holds perfectly still behind it, the
 * way a fixed point in the sky reads against a moving veil.
 * Base geometry: Lucide `cloud-moon` (ISC).
 */
const DUR = 1.4

export function CloudMoonIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud moon'}
      {...hoverProps}
    >
      <motion.path
        d="M13 16a3 3 0 0 1 0 6H7a5 5 0 1 1 4.9-6z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 2, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="M18.376 14.512a6 6 0 0 0 3.461-4.127c.148-.625-.659-.97-1.248-.714a4 4 0 0 1-5.259-5.26c.255-.589-.09-1.395-.716-1.248a6 6 0 0 0-4.594 5.36" />
    </svg>
  )
}

export const meta = {
  name: 'cloud-moon',
  gesture: 'the night clouds pass',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'night'],
}

export default CloudMoonIcon
