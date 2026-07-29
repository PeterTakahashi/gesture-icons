import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Wifi zero — it draws itself. This glyph has no arcs to redraw — zero bars
 * means there is no signal to bring back. The honest alternative: the dot
 * (the device itself) gives two hard binary blinks, like a receiver
 * checking for a signal and coming up empty, then holds steady — never a
 * fade, per the opacity-gate rule.
 * Base geometry: Lucide `wifi-zero` (ISC).
 */
const DUR = 0.7

export function WifiZeroIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wifi zero'}
      {...hoverProps}
    >
      <motion.path
        d="M12 20h.01"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.09, 0.1, 0.22, 0.23, 0.35, 0.36, 0.48, 0.49, 0.55],
              ease: 'linear',
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'wifi-zero',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['signal', 'network', 'wifi', 'zero'],
}

export default WifiZeroIcon
