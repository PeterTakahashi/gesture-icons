import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Forward — it is passed on. Mirror of reply: the whole arrow winds up left,
 * drives right and down the curve, and settles back exactly on Lucide's
 * resting glyph.
 * Base geometry: Lucide `forward` (ISC).
 */
const DUR = 0.8

export function ForwardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'forward'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.6, 2.5, 2.5, 0],
            y: [0, 0, 0.4, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.46, 0.78, 1], ease: [easeInOutCubic, easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="m15 17 5-5-5-5" />
        <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'forward',
  gesture: 'it is passed on',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['share', 'email', 'send'],
}

export default ForwardIcon
