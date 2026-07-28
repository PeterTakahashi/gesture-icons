import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, easeOutQuint, settleBack } from '../core/easings'

/**
 * Microwave — it dings done. The interior plate is 180°-symmetric, so it
 * turns a half revolution with a small wind-up and overshoot and lands on a
 * picture identical to rest — the plate spinning inside. Once it stops, the
 * whole box takes a small stamp pulse: the ding. The door is only ever the
 * fixed outline; it never opens.
 * Base geometry: Lucide `microwave` (ISC).
 */
const DUR = 1.0

export function MicrowaveIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'microwave'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 11.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1, 0.94, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.75, 0.8, 0.9, 0.97, 1], ease: ['linear', 'linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <rect width="20" height="15" x="2" y="4" rx="2" />
        <motion.rect
          width="8" height="7" x="6" y="8" rx="1"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -10, 190, 180],
              transition: { duration: DUR, times: [0, 0.15, 0.55, 0.75], ease: [easeInOutCubic, easeOutQuint, easeOutQuart] },
            },
          }}
        />
        <path d="M18 8v7" />
        <path d="M6 19v2" />
        <path d="M18 19v2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'microwave',
  gesture: 'it dings done',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['kitchen', 'appliance'],
}

export default MicrowaveIcon
