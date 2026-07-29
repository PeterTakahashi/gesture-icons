import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Star minus — one is removed. VARIANT: only the minus bar moves — a small
 * wind-up toward the star, then escorted away and settled back to its
 * resting mark. The star body holds still.
 * Base geometry: Lucide `star-minus` (ISC).
 */
const DUR = 0.9

export function StarMinusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'star minus'}
      {...hoverProps}
    >
      <motion.path
        d="M15 18h6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.5, 0.85], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <path d="M17.688 14a2.1 2.1 0 0 1 .416-.568l3.736-3.638a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014" />
    </svg>
  )
}

export const meta = {
  name: 'star-minus',
  gesture: 'one is removed',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['remove', 'star', 'minus'],
}

export default StarMinusIcon
