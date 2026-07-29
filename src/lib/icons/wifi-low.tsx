import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Wifi low — the signal arrives. The dot holds still — it is the device,
 * not the signal, same reasoning as wifi.tsx. The single close arc erases
 * then redraws, never a fade.
 * Base geometry: Lucide `wifi-low` (ISC).
 */
const DUR = 1.0

export function WifiLowIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wifi low'}
      {...hoverProps}
    >
      <path d="M12 20h.01" />
      <motion.path
        d="M8.5 16.429a5 5 0 0 1 7 0"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.32, 0.65], ease: [easeInCubic, 'linear', easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'wifi-low',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['signal', 'network', 'wifi', 'low'],
}

export default WifiLowIcon
