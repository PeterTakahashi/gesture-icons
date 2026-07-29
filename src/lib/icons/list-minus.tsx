import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * List minus — one is removed. VARIANT: only the minus bar moves — a small
 * wind-up along its own horizontal axis, then nudged away as if escorted
 * out, settling back on its resting mark. The list lines hold still.
 * Base geometry: Lucide `list-minus` (ISC).
 */
const DUR = 0.9

export function ListMinusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list minus'}
      {...hoverProps}
    >
      <path d="M16 5H3" />
      <path d="M11 12H3" />
      <path d="M16 19H3" />
      <motion.path
        d="M21 12h-6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.5, 0.85], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'list-minus',
  gesture: 'one is removed',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['remove', 'list', 'minus'],
}

export default ListMinusIcon
