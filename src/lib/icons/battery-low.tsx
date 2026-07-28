import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Battery low — it runs low. The single low-charge bar blinks twice, a true
 * binary step with no fade, then stays lit — the warning, same idiom as the
 * cursor in `terminal.tsx`. The shell never moves.
 * Base geometry: Lucide `battery-low` (ISC).
 */
const DUR = 0.9

export function BatteryLowIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'battery low'}
      {...hoverProps}
    >
      <path d="M22 14v-4" />
      <motion.path
        d="M6 14v-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.13, 0.28, 0.29, 0.44, 0.45, 0.6, 0.61],
              ease: 'linear',
            },
          },
        }}
      />
      <rect x="2" y="6" width="16" height="12" rx="2" />
    </svg>
  )
}

export const meta = {
  name: 'battery-low',
  gesture: 'it runs low',
  family: 'secondary' as const,
  section: 'Devices',
  tags: ['power', 'empty', 'warning'],
}

export default BatteryLowIcon
