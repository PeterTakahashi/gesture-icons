import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Stethoscope — it listens. The chest piece presses softly, twice, in
 * lub-dub timing — the second beat a touch lighter — while the tubes stay
 * still, held in place.
 * Base geometry: Lucide `stethoscope` (ISC).
 */
const DUR = 1.0

export function StethoscopeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'stethoscope'}
      {...hoverProps}
    >
      <path d="M11 2v2" />
      <path d="M5 2v2" />
      <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
      <path d="M8 15a6 6 0 0 0 12 0v-3" />
      <motion.circle
        cx="20" cy="10" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.85, 1.1, 1, 0.92, 1.05, 1],
            transition: { duration: DUR, times: [0, 0.14, 0.28, 0.42, 0.58, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'stethoscope',
  gesture: 'it listens',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['doctor', 'medical', 'checkup'],
}

export default StethoscopeIcon
