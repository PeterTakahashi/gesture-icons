import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Sheet — it does what it means. The two row-divider lines nudge x+1.2 and
 * settle, top row first and the one below it a beat later — data taking
 * its place row by row. The frame and the column dividers hold still.
 * Base geometry: Lucide `sheet` (ISC).
 */
const DUR = 0.9

export function SheetIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sheet'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <motion.line
        x1="3" x2="21" y1="9" y2="9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.8], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.line
        x1="3" x2="21" y1="15" y2="15"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 1.2, 0],
            transition: { duration: DUR, delay: 0.06, times: [0, 0.4, 0.8], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <line x1="9" x2="9" y1="9" y2="21" />
      <line x1="15" x2="15" y1="9" y2="21" />
    </svg>
  )
}

export const meta = {
  name: 'sheet',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['table', 'data', 'board', 'sheet'],
}

export default SheetIcon
