import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Arrow up-down — it weighs both ways. The up arrow NUDGEs up while the down
 * arrow NUDGEs down, at the same time, then both settle back home — the pair
 * pulling apart before they rest, so the "both directions" reading lands.
 * Base geometry: Lucide `arrow-up-down` (ISC).
 */
const DUR = 0.75
const DRIVE = 2
const WIND = 0.6

export function ArrowUpDownIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'arrow up down'}
      {...hoverProps}
    >
      {/* down arrow nudges down */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -WIND, DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="m21 16-4 4-4-4" />
        <path d="M17 20V4" />
      </motion.g>
      {/* up arrow nudges up */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, WIND, -DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'arrow-up-down',
  gesture: 'it weighs both ways',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['sort', 'swap', 'vertical'],
}

export default ArrowUpDownIcon
