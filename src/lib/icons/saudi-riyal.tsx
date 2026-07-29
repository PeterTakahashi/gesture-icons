import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Saudi riyal — it rings up. A stamp with a tiny turn: the whole glyph
 * presses down, twists a hair, and pops back past its own size before
 * settling — cha-ching without the sound, same beat as dollar-sign.tsx.
 * Base geometry: Lucide `saudi-riyal` (ISC).
 */
const DUR = 0.7

export function SaudiRiyalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'saudi riyal'}
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
        <path d="m20 19.5-5.5 1.2" />
        <path d="M14.5 4v11.22a1 1 0 0 0 1.242.97L20 15.2" />
        <path d="m2.978 19.351 5.549-1.363A2 2 0 0 0 10 16V2" />
        <path d="M20 10 4 13.5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'saudi-riyal',
  gesture: 'it lands with intent',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['money', 'currency', 'saudi', 'riyal'],
}

export default SaudiRiyalIcon
