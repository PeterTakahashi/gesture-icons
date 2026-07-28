import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * List — the items check in. Each bullet blinks out and re-stamps in
 * sequence top-down (scale, never opacity) while the text lines hold
 * still — the list confirming itself item by item.
 * Base geometry: Lucide `list` (ISC).
 */
const DUR = 0.9
const DOTS: Array<[number, number]> = [[3, 5], [3, 12], [3, 19]]

function pop(delay: number): Variants {
  return {
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.001, 1.3, 1],
      transition: { duration: DUR, delay, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
    },
  }
}

export function ListIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list'}
      {...hoverProps}
    >
      {DOTS.map(([x, y], i) => (
        <motion.path
          key={`${x}-${y}`}
          d={`M${x} ${y}h.01`}
          style={{ transformBox: 'view-box', transformOrigin: `${x}px ${y}px` }}
          initial="normal" animate={controls} variants={pop(i * 0.09)}
        />
      ))}
      <path d="M8 5h13" />
      <path d="M8 12h13" />
      <path d="M8 19h13" />
    </svg>
  )
}

export const meta = {
  name: 'list',
  gesture: 'the items check in',
  family: 'secondary' as const,
  section: 'Text & editing',
  tags: ['bullet', 'items'],
}

export default ListIcon
