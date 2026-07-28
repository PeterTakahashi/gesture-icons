import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Inbox — something arrives. A dot falls from above the frame, squeezes
 * through the tray's slot, settles into the well — and is absorbed there
 * (scaled away, not faded) rather than flying back off-screen, because it
 * has actually landed. Only once it is invisible is it put back at its
 * hidden rest position above the frame. The tray dips on the catch.
 * Base geometry: Lucide `inbox` (ISC).
 */
const DUR = 1.05

export function InboxIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'inbox'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.46, 0.58, 0.76], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </motion.g>
      {/* the arrival: hidden above the frame, absorbed into the well when it lands */}
      <motion.circle
        cx="12" r="1.3"
        fill={color === 'currentColor' ? 'currentColor' : color}
        stroke="none"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { cy: -3, r: 1.3, scale: 1 },
          animate: {
            cy: [-3, 9, 13, 15, 15, -3],
            r: [1.3, 1.3, 0.95, 1.15, 1.15, 1.3],
            scale: [1, 1, 1, 1, 0.001, 1],
            transition: {
              duration: DUR,
              times: [0, 0.28, 0.46, 0.6, 0.78, 0.78],
              ease: [gravity, easeInOutCubic, easeOutQuart, easeInOutCubic, 'linear'],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'inbox',
  gesture: 'something arrives',
  family: 'secondary' as const,
  section: 'Files & time',
  tags: ['mail', 'tray', 'receive'],
}

export default InboxIcon
