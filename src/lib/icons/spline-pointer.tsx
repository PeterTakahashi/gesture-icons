import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Spline pointer — the cursor clicks. The pointer nudges down-right along
 * its own aim, hits a hard stop, and settles back with a small overshoot —
 * one click. The spline curve and its two handles are what's being pointed
 * at, so they hold still.
 * Base geometry: Lucide `spline-pointer` (ISC).
 */
const DUR = 0.7

export function SplinePointerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'spline pointer'}
      {...hoverProps}
    >
      <path d="M5 17A12 12 0 0 1 17 5" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <motion.path
        d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.17, 0.85, 0.85, 0],
            y: [0, -0.17, 0.85, 0.85, 0],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.32, 0.5, 0.85],
              ease: [easeInOutCubic, easeOutQuart, 'linear', settleBack],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'spline-pointer',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['cursor', 'click', 'pointer', 'spline'],
}

export default SplinePointerIcon
