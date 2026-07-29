import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Mouse pointer square dashed — it does what it means. VARIANT(mouse-pointer):
 * the cursor NUDGEs down-right into its click, hard stop, settle back; the
 * dashed marquee frame holds fixed the whole time.
 * Base geometry: Lucide `mouse-pointer-square-dashed` (ISC).
 */
const DUR = 0.7
const D = 0.7071
const DRIVE = 1.2
const WIND = 0.3

export function MousePointerSquareDashedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mouse pointer square dashed'}
      {...hoverProps}
    >
      <motion.path
        d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"
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
      <path d="M5 3a2 2 0 0 0-2 2" />
      <path d="M19 3a2 2 0 0 1 2 2" />
      <path d="M5 21a2 2 0 0 1-2-2" />
      <path d="M9 3h1" />
      <path d="M9 21h2" />
      <path d="M14 3h1" />
      <path d="M3 9v1" />
      <path d="M21 9v2" />
      <path d="M3 14v1" />
    </svg>
  )
}

export const meta = {
  name: 'mouse-pointer-square-dashed',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['cursor', 'click', 'pointer', 'mouse', 'square', 'dashed'],
}

export default MousePointerSquareDashedIcon
