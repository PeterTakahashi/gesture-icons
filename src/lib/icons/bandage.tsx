import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Bandage — it patches up. The whole strip presses down and pops with a
 * tiny twist, then lands flat — smoothed onto the skin; the pad dots ride
 * along rigidly.
 * Base geometry: Lucide `bandage` (ISC).
 */
const DUR = 0.7

export function BandageIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bandage'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 1.08, 0.98, 1],
            rotate: [0, -3, 1, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.6, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M10 10.01h.01" />
        <path d="M10 14.01h.01" />
        <path d="M14 10.01h.01" />
        <path d="M14 14.01h.01" />
        <path d="M18 6v12" />
        <path d="M6 6v12" />
        <rect x="2" y="6" width="20" height="12" rx="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'bandage',
  gesture: 'it patches up',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['injury', 'fix', 'plaster'],
}

export default BandageIcon
