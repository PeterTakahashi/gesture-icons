import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Clock 9 — nine o'clock. VARIANT(clock): the combined hour/minute hand
 * sweeps one full eased lap about the dial's center and lands exactly back
 * on 9 o'clock — the same clean-lap mechanic as clock.tsx and clock-4.tsx.
 * Base geometry: Lucide `clock-9` (ISC).
 */
const DUR = 1.1
const LAP_EASE: [number, number, number, number] = [0.4, 0, 0.3, 1]

export function Clock9Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clock 9'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="M12 6v6H8"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 360],
            transition: { duration: DUR, ease: LAP_EASE },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'clock-9',
  gesture: "nine o'clock",
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['time', 'clock'],
}

export default Clock9Icon
