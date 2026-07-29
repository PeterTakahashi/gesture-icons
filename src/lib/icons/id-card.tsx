import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * ID card — it is shown. The whole card lifts and tips up about its own
 * bottom edge — flashed at the door — then settles back flat; the portrait
 * and text marks ride along rigidly, holding their place on the card rather
 * than getting any secondary motion of their own.
 * Base geometry: Lucide `id-card` (ISC).
 */
const DUR = 0.8

export function IdCardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'id card'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -3, 0],
            y: [0, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M16 10h2" />
        <path d="M16 14h2" />
        <path d="M6.17 15a3 3 0 0 1 5.66 0" />
        <circle cx="9" cy="11" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'id-card',
  gesture: 'it is shown',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['badge', 'identity', 'pass', 'card'],
}

export default IdCardIcon
