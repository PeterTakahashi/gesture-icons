import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * USB — it clicks in. A tiny failed half-push toward the plug end (up the
 * 19,5-to-4,20 axis) that retreats — USB never seats first try — then the
 * full push with a hard, no-overshoot stop, and the whole connector settles
 * back to rest once it's registered.
 * Base geometry: Lucide `usb` (ISC).
 */
const DUR = 1.0
// unit vector toward the plug end (19,5), scaled to a 1-unit push
const UX = 0.707
const UY = -0.707

export function UsbIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'usb'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            // failed half-push, retreat, full push with a hard stop, settle home
            x: [0, UX * 0.7, 0, UX * 2, 0],
            y: [0, UY * 0.7, 0, UY * 2, 0],
            transition: {
              duration: DUR,
              times: [0, 0.22, 0.38, 0.68, 1],
              ease: [easeOutQuart, easeInOutCubic, easeOutQuart, easeInOutCubic],
            },
          },
        }}
      >
        <circle cx="10" cy="7" r="1" />
        <circle cx="4" cy="20" r="1" />
        <path d="M4.7 19.3 19 5" />
        <path d="m21 3-3 1 2 2Z" />
        <path d="M9.26 7.68 5 12l2 5" />
        <path d="m10 14 5 2 3.5-3.5" />
        <path d="m18 12 1-1 1 1-1 1Z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'usb',
  gesture: 'it clicks in',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['connector', 'port'],
}

export default UsbIcon
