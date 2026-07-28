import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Speaker — the cone pumps. The driver contracts-and-releases twice, the
 * second beat smaller, while the cabinet shivers on the same clock as the
 * box resonates with it.
 * Base geometry: Lucide `speaker` (ISC).
 */
const DUR = 0.9
const T = [0, 0.2, 0.42, 0.62, 0.85]

export function SpeakerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'speaker'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.4, -0.3, 0.2, 0],
            transition: { duration: DUR, times: T, ease: easeInOutCubic },
          },
        }}
      >
        <rect width="16" height="20" x="4" y="2" rx="2" />
        <path d="M12 6h.01" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.25, 1, 1.18, 1],
            transition: { duration: DUR, times: T, ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="12" cy="14" r="4" />
        <path d="M12 14h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'speaker',
  gesture: 'the cone pumps',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['audio', 'sound', 'music', 'subwoofer'],
}

export default SpeakerIcon
