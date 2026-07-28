import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Italic — it leans in. The glyph is already drawn slanted, so the gesture
 * is a further shear about its own baseline: skewX drives past the resting
 * slant, rebounds slightly past upright, and settles back to the slant
 * Lucide drew — a lean and a recovery, not a wobble.
 * Base geometry: Lucide `italic` (ISC).
 */
const DUR = 0.8

export function ItalicIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'italic'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { skewX: 0 },
          animate: {
            skewX: [0, -9, 3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.75, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <line x1="19" x2="10" y1="4" y2="4" />
        <line x1="14" x2="5" y1="20" y2="20" />
        <line x1="15" x2="9" y1="4" y2="20" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'italic',
  gesture: 'it leans in',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['font', 'slant', 'format'],
}

export default ItalicIcon
