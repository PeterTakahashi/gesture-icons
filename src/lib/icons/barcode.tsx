import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Barcode — it is scanned. Each bar hard-blinks off then on, left to right,
 * one after another — the laser line passing over it, never a fade. All
 * bars are steady again once the sweep has crossed.
 * Base geometry: Lucide `barcode` (ISC).
 */
const DUR = 0.6
const BARS = [3, 8, 12, 17, 21]

export function BarcodeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'barcode'}
      {...hoverProps}
    >
      {BARS.map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 5v14`}
          initial="normal"
          animate={controls}
          variants={{
            normal: { opacity: 1 },
            animate: {
              opacity: [1, 1, 0, 0, 1, 1],
              transition: {
                duration: DUR,
                delay: i * 0.09,
                times: [0, 0.25, 0.3, 0.75, 0.8, 1],
                ease: 'linear',
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'barcode',
  gesture: 'it is scanned',
  family: 'secondary' as const,
  section: 'Commerce & feedback',
  tags: ['scan', 'product', 'retail', 'barcode'],
}

export default BarcodeIcon
