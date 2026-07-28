import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Arrow down — it urges downward, the mirror of arrow-up.tsx. Wind-up up
 * (the load), drive down past the mark, settle home. The chevron head runs
 * 3% ahead of the shaft the whole beat.
 * Base geometry: Lucide `arrow-down` (ISC).
 */
const DUR = 0.75

export function ArrowDownIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'arrow down'}
      {...hoverProps}
    >
      <motion.path
        d="M12 5v14"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.5, 3, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="m19 12-7 7-7-7"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.5, 3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.59, 0.97], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'arrow-down',
  gesture: 'it urges downward',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['down', 'direction'],
}

export default ArrowDownIcon
