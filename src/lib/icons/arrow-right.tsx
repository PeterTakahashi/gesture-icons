import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Arrow right — it urges right, the mirror of arrow-left.tsx. Wind-up left
 * (the load), drive right past the mark, settle home. The chevron head runs
 * 3% ahead of the shaft the whole beat.
 * Base geometry: Lucide `arrow-right` (ISC).
 */
const DUR = 0.75

export function ArrowRightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'arrow right'}
      {...hoverProps}
    >
      <motion.path
        d="M5 12h14"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1.5, 3, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="m12 5 7 7-7 7"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1.5, 3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.59, 0.97], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'arrow-right',
  gesture: 'it urges right',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['right', 'next', 'direction'],
}

export default ArrowRightIcon
