import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * X line top — the top bar holds still; the X below it shakes no. The
 * cross rotates about its own center, decaying with each swing, same
 * language as x.tsx, while the header bar it hangs from stays fixed.
 * Base geometry: Lucide `x-line-top` (ISC).
 */
const DUR = 0.85

export function XLineTopIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'x line top'}
      {...hoverProps}
    >
      <path d="M18 4H6" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, 11, -7, 4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M18 8 6 20" />
        <path d="m6 8 12 12" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'x-line-top',
  gesture: 'it shakes no',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['frame', 'mark', 'line', 'top'],
}

export default XLineTopIcon
