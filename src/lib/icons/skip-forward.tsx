import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Skip forward — it jumps to the next. The triangle dashes right into the
 * bar; the bar takes the contact with a small nudge exactly on arrival,
 * and the triangle returns to rest — one clock, so the hit lands clean.
 * (The spec's first idea — an off-frame jump hidden behind the bar — has
 * no frame to hide behind on this glyph, so this keeps the honest version
 * it names as the fallback: a dash-and-return contact, not a teleport.)
 * Base geometry: Lucide `skip-forward` (ISC).
 */
const DUR = 0.9

export function SkipForwardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'skip forward'}
      {...hoverProps}
    >
      <motion.path
        d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 3.5, 3.5, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.56, 1], ease: [easeInCubic, 'linear', easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M21 4v16"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.58, 0.8], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'skip-forward',
  gesture: 'it jumps to the next',
  family: 'travel' as const,
  section: 'Communication',
  tags: ['next', 'media', 'forward'],
}

export default SkipForwardIcon
