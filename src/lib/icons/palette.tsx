import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Palette — the paint wells pop, one after another, like the colors
 * coming alive under the brush; the board itself stays perfectly still.
 * Base geometry: Lucide `palette` (ISC).
 */
const DUR = 0.5
const WELLS: Array<[number, number]> = [
  [13.5, 6.5],
  [17.5, 10.5],
  [6.5, 12.5],
  [8.5, 7.5],
]

function pop(delay: number): Variants {
  return {
    normal: { scale: 1 },
    animate: {
      scale: [1, 1.35, 1],
      transition: { duration: DUR, delay, times: [0, 0.4, 1], ease: [settleBack, easeOutQuart] },
    },
  }
}

export function PaletteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'palette'}
      {...hoverProps}
    >
      <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
      {WELLS.map(([cx, cy], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx} cy={cy} r={0.5}
          fill={color === 'currentColor' ? 'currentColor' : color}
          stroke="none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal" animate={controls} variants={pop(i * 0.07)}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'palette',
  gesture: 'the colors stir',
  family: 'secondary' as const,
  section: 'Text & editing',
  tags: ['color', 'art', 'design'],
}

export default PaletteIcon
