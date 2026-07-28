import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Bold — it thickens its voice. A short, firm STAMP: the glyph presses in a
 * hair, pops past its own size with authority, and lands — quicker and more
 * assertive than plus's stamp, matching the weight of the letterform itself.
 * Base geometry: Lucide `bold` (ISC).
 */
const DUR = 0.65

export function BoldIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bold'}
      {...hoverProps}
    >
      <motion.path
        d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"
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
      />
    </svg>
  )
}

export const meta = {
  name: 'bold',
  gesture: 'it thickens its voice',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['font', 'strong', 'format'],
}

export default BoldIcon
