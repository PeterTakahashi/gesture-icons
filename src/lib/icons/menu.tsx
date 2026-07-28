import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Menu — the lines fall in. Each bar nudges right and returns, top bar
 * first, then the next, then the last — a top-down cascade, like items
 * lining up as a list opens.
 * Base geometry: Lucide `menu` (ISC).
 */
const DUR = 0.7
const BARS = [
  { d: 'M4 5h16', delay: 0 },
  { d: 'M4 12h16', delay: 0.06 },
  { d: 'M4 19h16', delay: 0.12 },
]

export function MenuIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'menu'}
      {...hoverProps}
    >
      {BARS.map((bar) => (
        <motion.path
          key={bar.d}
          d={bar.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { x: 0 },
            animate: {
              x: [0, 2.2, 0],
              transition: { duration: DUR, delay: bar.delay, times: [0, 0.35, 1], ease: easeInOutCubic },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'menu',
  gesture: 'the lines fall in',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['hamburger', 'nav', 'list'],
}

export default MenuIcon
