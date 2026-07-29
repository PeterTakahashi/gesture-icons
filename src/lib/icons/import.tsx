import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Import — the arrow drops into the tray it already points at. A small
 * wind-up up first, then the drive down past the mark and a settleBack —
 * and the open tray takes a 1-unit contact nudge right as the arrow arrives,
 * never a frame before.
 * Base geometry: Lucide `import` (ISC).
 */
const DUR = 0.9

export function ImportIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'import'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 1.6, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 3v12" />
        <path d="m8 11 4 4 4-4" />
      </motion.g>
      {/* the tray takes the hit on the contact frame */}
      <motion.path
        d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.7, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.63, 0.8, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'import',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['navigate', 'step', 'import'],
}

export default ImportIcon
