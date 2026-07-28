import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Bluetooth — it pairs. The rune has no separate points to flash, so the
 * pairing chirp is told with the whole mark instead: a nudge toward the
 * paired side with a scale pulse, then two quick extra pulses for the two
 * beats of a successful handshake, before it settles back to rest.
 * Base geometry: Lucide `bluetooth` (ISC).
 */
const DUR = 0.9

export function BluetoothIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bluetooth'}
      {...hoverProps}
    >
      <motion.path
        d="m7 7 10 10-5 5V2l5 5L7 17"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, scale: 1 },
          animate: {
            x: [0, -0.3, 1, 0, 0, 0],
            scale: [1, 1, 1.06, 1, 1.07, 1],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.4, 0.58, 0.76, 0.9],
              ease: [easeInCubic, settleBack, easeOutQuart, settleBack, easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bluetooth',
  gesture: 'it pairs',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['wireless', 'connect'],
}

export default BluetoothIcon
