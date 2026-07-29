import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Hamburger — the stack settles. The top bun lifts and drops back with a
 * landing dip that propagates down through the patty line, the lettuce and
 * the bottom bun — each set off a beat later than the layer above it, same
 * cascading-impact language as `layers.tsx` — assembled.
 * Base geometry: Lucide `hamburger` (ISC).
 */
const DUR = 1.0

export function HamburgerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hamburger'}
      {...hoverProps}
    >
      <motion.path
        d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.5, 0.3, -0.1, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.56, 0.74, 1], ease: [easeOutQuart, gravity, easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.7, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.33, 0.46, 0.62, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.36, 0.49, 0.65, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.35, -0.1, 0],
            transition: { duration: DUR, times: [0, 0.39, 0.52, 0.68, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'hamburger',
  gesture: 'the stack settles',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['burger', 'food', 'fast', 'hamburger'],
}

export default HamburgerIcon
