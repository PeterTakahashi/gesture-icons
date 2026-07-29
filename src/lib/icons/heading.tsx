import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Heading — it lands with intent. The H STAMPs: a short, firm press and pop
 * past its own size, then rest — a heading set in place. No level digit on
 * this glyph, so the stamp alone carries it.
 * Base geometry: Lucide `heading` (ISC).
 */
const DUR = 0.65

export function HeadingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'heading'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.94, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M6 12h12" />
        <path d="M6 20V4" />
        <path d="M18 20V4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'heading',
  gesture: 'it lands with intent',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['heading', 'text', 'title'],
}

export default HeadingIcon
