import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Crop — the frame is trimmed. The two corner brackets pull toward each
 * other along their own diagonal, hold the tighter frame for a beat while
 * the decision is felt, then let go back to the original crop — considered,
 * then undone.
 * Base geometry: Lucide `crop` (ISC).
 */
const DUR = 1.0

export function CropIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'crop'}
      {...hoverProps}
    >
      <motion.path
        d="M6 2v14a2 2 0 0 0 2 2h14"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1.1, 1.1, 0],
            y: [0, 1.1, 1.1, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M18 22V8a2 2 0 0 0-2-2H2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1.1, -1.1, 0],
            y: [0, -1.1, -1.1, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'crop',
  gesture: 'the frame is trimmed',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['edit', 'photo', 'resize', 'crop'],
}

export default CropIcon
