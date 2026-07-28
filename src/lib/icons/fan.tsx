import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint } from '../core/easings'

/**
 * Fan — it stirs the air. The three-bladed pinwheel is 3-fold symmetric, so
 * a 120° turn lands on a picture identical to rest — a free landing, same
 * trick as star.tsx's 72°. A small counter-wind-up first, then the turn
 * carries slightly past 120° before settling there. The hub stays put.
 * Base geometry: Lucide `fan` (ISC).
 */
const DUR = 1.2

export function FanIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fan'}
      {...hoverProps}
    >
      <motion.path
        d="M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 132, 120],
            transition: { duration: DUR, times: [0, 0.18, 0.82, 1], ease: [easeInOutCubic, easeOutQuint, easeOutQuart] },
          },
        }}
      />
      <path d="M12 12v.01" />
    </svg>
  )
}

export const meta = {
  name: 'fan',
  gesture: 'it stirs the air',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['cooling', 'air'],
}

export default FanIcon
