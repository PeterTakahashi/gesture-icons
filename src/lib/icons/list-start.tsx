import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * List start — VARIANT(list): the rows and the entry bracket hold still;
 * the chevron alone — the one part that depicts motion — nudges further
 * into the bracket and springs back, reading as something inserted at the
 * top of the list. A single mark, so no stagger applies here.
 * Base geometry: Lucide `list-start` (ISC).
 */
const DUR = 0.75

export function ListStartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list start'}
      {...hoverProps}
    >
      <path d="M3 5h6" />
      <path d="M3 12h13" />
      <path d="M3 19h13" />
      <motion.path
        d="m16 8-3-3 3-3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.4, -1.8, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <path d="M21 19V7a2 2 0 0 0-2-2h-6" />
    </svg>
  )
}

export const meta = {
  name: 'list-start',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['list', 'start'],
}

export default ListStartIcon
