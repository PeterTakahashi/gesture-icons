import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Move up — it urges upward. NUDGE up: the chevron winds down 1 then drives
 * up 2.5 with a settleBack overshoot, the shaft on the same clock a hair
 * behind it — the same handoff as arrow-up.tsx, just with a full-length
 * shaft instead of a stub.
 * Base geometry: Lucide `move-up` (ISC).
 */
const DUR = 0.75

export function MoveUpIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'move up'}
      {...hoverProps}
    >
      <motion.path
        d="M8 6L12 2L16 6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.5, -3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.59, 0.97], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M12 2V22"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.5, -3, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'move-up',
  gesture: 'it urges upward',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['up', 'move'],
}

export default MoveUpIcon
