import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Computer — it boots. VARIANT(monitor): a wake line hard-blinks in the
 * screen — never a fade, a monitor's backlight is on or off — and once it
 * settles the tower's status LED answers with a single blink of its own:
 * POST complete.
 * Base geometry: Lucide `computer` (ISC).
 */
const DUR = 1.0

export function ComputerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'computer'}
      {...hoverProps}
    >
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      {/* wake line: not part of Lucide's glyph, hidden at rest, blinks twice */}
      <motion.path
        d="M9 6h6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 0 },
          animate: {
            opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
            transition: {
              duration: DUR,
              times: [0, 0.08, 0.09, 0.24, 0.25, 0.4, 0.41, 0.56, 0.57, 0.66],
              ease: 'linear',
            },
          },
        }}
      />
      {/* tower LED: a real glyph line, answers once after the screen wakes */}
      <motion.path
        d="M6 18h2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1],
            transition: { duration: DUR, times: [0, 0.68, 0.69, 0.82, 0.83, 1], ease: 'linear' },
          },
        }}
      />
      <path d="M12 18h6" />
    </svg>
  )
}

export const meta = {
  name: 'computer',
  gesture: 'it boots',
  family: 'secondary' as const,
  section: 'Devices',
  tags: ['desktop', 'pc', 'computer'],
}

export default ComputerIcon
