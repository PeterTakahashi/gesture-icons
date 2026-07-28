import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Accessibility — it moves freely. The whole figure NUDGEs forward, wind-up
 * back first, then home — the standard arrow-right.tsx workhorse — while the
 * wheel (the two arcs forming it) turns underneath, hinged at the wheel's own
 * center: motion with dignity, not a wobble.
 * Base geometry: Lucide `accessibility` (ISC).
 */
const DUR = 0.8

export function AccessibilityIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'accessibility'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1, 2, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <circle cx="16" cy="4" r="1" />
        <path d="m18 19 1-7-6 1" />
        <path d="m5 8 3-3 5.5 3-2.36 3.5" />
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: '9px 16px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, 12, 0],
              transition: { duration: DUR, times: [0, 0.6, 1], ease: [easeOutQuart, easeInOutCubic] },
            },
          }}
        >
          <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
          <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
        </motion.g>
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'accessibility',
  gesture: 'it moves freely',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['inclusive', 'wheelchair', 'a11y'],
}

export default AccessibilityIcon
