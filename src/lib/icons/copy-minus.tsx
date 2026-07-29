import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Copy minus — one is removed. VARIANT: only the minus bar moves — a small
 * wind-up along its own horizontal axis, then nudged away as if escorted
 * out, settling back on its resting mark. Both sheets hold still.
 * Base geometry: Lucide `copy-minus` (ISC).
 */
const DUR = 0.9

export function CopyMinusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'copy minus'}
      {...hoverProps}
    >
      <motion.line
        x1="12" x2="18" y1="15" y2="15"
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
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

export const meta = {
  name: 'copy-minus',
  gesture: 'one is removed',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['remove', 'copy', 'minus'],
}

export default CopyMinusIcon
