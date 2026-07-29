import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Mouse pointer ban — it does what it means. VARIANT(mouse-pointer): the
 * cursor still NUDGEs down-right into its click, hard stop, settle back —
 * the ban ring and slash hold fixed in place, the block that stops it.
 * Base geometry: Lucide `mouse-pointer-ban` (ISC).
 */
const DUR = 0.7
const D = 0.7071
const DRIVE = 1.2
const WIND = 0.3

export function MousePointerBanIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mouse pointer ban'}
      {...hoverProps}
    >
      <motion.path
        d="M2.034 2.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.944L8.204 7.545a1 1 0 0 0-.66.66l-1.066 3.443a.5.5 0 0 1-.944.033z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -WIND * D, DRIVE * D, DRIVE * D, 0],
            y: [0, -WIND * D, DRIVE * D, DRIVE * D, 0],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.32, 0.5, 0.85],
              ease: [easeInOutCubic, easeOutQuart, 'linear', settleBack],
            },
          },
        }}
      />
      <circle cx="16" cy="16" r="6" />
      <path d="m11.8 11.8 8.4 8.4" />
    </svg>
  )
}

export const meta = {
  name: 'mouse-pointer-ban',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['cursor', 'click', 'pointer', 'mouse', 'ban'],
}

export default MousePointerBanIcon
