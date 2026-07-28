import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Arrow up — it urges upward. A wind-up down (the load) then a drive up past
 * the mark before it settles home. The chevron head runs 3% ahead of the
 * shaft the whole beat, so the tip is felt leading the pull, not glued to it.
 * Base geometry: Lucide `arrow-up` (ISC).
 */
const DUR = 0.75

export function ArrowUpIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'arrow up'}
      {...hoverProps}
    >
      <motion.path
        d="m5 12 7-7 7 7"
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
        d="M12 19V5"
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
  name: 'arrow-up',
  gesture: 'it urges upward',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['up', 'direction'],
}

export default ArrowUpIcon
