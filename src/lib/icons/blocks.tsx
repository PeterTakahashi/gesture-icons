import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Blocks — they stack. The top block lifts and drops back into place; the
 * lower block isn't hit by the top block leaving, it's hit by it landing —
 * so its own small compression sets in 3% later, on the same curve.
 * Base geometry: Lucide `blocks` (ISC).
 */
const DUR = 1.0

export function BlocksIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'blocks'}
      {...hoverProps}
    >
      <motion.path
        d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.53, 0.66, 0.82, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.rect
        x="14" y="2" width="8" height="8" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -3.6, 0.6, -0.15, 0],
            transition: {
              duration: DUR,
              times: [0, 0.3, 0.56, 0.74, 1],
              ease: [easeOutQuart, gravity, easeOutQuart, easeInOutCubic],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'blocks',
  gesture: 'they stack',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['toys', 'build', 'lego'],
}

export default BlocksIcon
