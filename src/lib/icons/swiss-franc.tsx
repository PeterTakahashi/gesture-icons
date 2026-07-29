import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Swiss franc — it rings up. VARIANT(dollar-sign): the whole glyph presses
 * down, twists a hair, and pops back past its own size before settling —
 * cha-ching without the sound.
 * Base geometry: Lucide `swiss-franc` (ISC).
 */
const DUR = 0.7

export function SwissFrancIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'swiss franc'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.9, 1.12, 1],
            rotate: [0, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M10 21V3h8" />
        <path d="M6 16h9" />
        <path d="M10 9.5h7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'swiss-franc',
  gesture: 'it lands with intent',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['money', 'currency', 'swiss', 'franc'],
}

export default SwissFrancIcon
