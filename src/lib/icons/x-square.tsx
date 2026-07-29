import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * X square — the frame holds still; the mark inside shakes no. The X
 * rotates about its own center, decaying with each swing, same language as
 * x.tsx, while the square takes one soft breath, exactly as check-square.tsx
 * breathes for its own inner mark.
 * Base geometry: Lucide `x-square` (ISC).
 */
const DUR = 0.85

export function XSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'x square'}
      {...hoverProps}
    >
      <motion.rect
        width="18" height="18" x="3" y="3" rx="2" ry="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.45, 0.85], ease: easeOutQuart },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
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
        <path d="m15 9-6 6" />
        <path d="m9 9 6 6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'x-square',
  gesture: 'it shakes no',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['frame', 'mark', 'square'],
}

export default XSquareIcon
