import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Wrap text — the line wraps. The wrapping arrow (its curved body and
 * chevron head, moving as one) NUDGEs along its own bend — right along the
 * top, then down and left toward where the chevron points — before it
 * settles back home. The text lines above and below hold still.
 * Base geometry: Lucide `wrap-text` (ISC).
 */
const DUR = 0.9

export function WrapTextIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wrap text'}
      {...hoverProps}
    >
      <path d="M3 5h18" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.3, 1.2, -0.8, 0],
            y: [0, -0.2, 0.2, 1.1, 0],
            transition: {
              duration: DUR,
              times: [0, 0.15, 0.45, 0.75, 1],
              ease: [easeInOutCubic, easeOutQuart, easeInOutCubic, settleBack],
            },
          },
        }}
      >
        <path d="M3 12h14.5a1 1 0 0 1 0 7H13" />
        <path d="m16 16-3 3 3 3" />
      </motion.g>
      <path d="M3 19h6" />
    </svg>
  )
}

export const meta = {
  name: 'wrap-text',
  gesture: 'the line wraps',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['format', 'break', 'wrap', 'text'],
}

export default WrapTextIcon
