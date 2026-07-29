import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Toilet — it flushes. The tank dips first, as if the lever were pressed,
 * then the bowl gives a quick decaying shake — whoosh — and settles.
 * Base geometry: Lucide `toilet` (ISC).
 */
const DUR = 0.9

export function ToiletIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'toilet'}
      {...hoverProps}
    >
      <motion.path
        d="M8 18a5 5 0 0 1-5-5V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.14, 0.28, 0.4], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M7 12h13a1 1 0 0 1 1 1 5 5 0 0 1-5 5h-.598a.5.5 0 0 0-.424.765l1.544 2.47a.5.5 0 0 1-.424.765H5.402a.5.5 0 0 1-.424-.765L7 18"
        style={{ transformBox: 'view-box', transformOrigin: '12px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, -3, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.5, 0.68, 0.85, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'toilet',
  gesture: 'it flushes',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['bathroom', 'wc', 'toilet'],
}

export default ToiletIcon
