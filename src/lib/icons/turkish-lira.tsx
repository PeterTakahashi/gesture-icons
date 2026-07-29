import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Turkish lira — it rings up. A stamp with a tiny turn: the whole glyph
 * presses down, twists a hair, and pops back past its own size before
 * settling — cha-ching without the sound, exactly as dollar-sign.tsx.
 * Base geometry: Lucide `turkish-lira` (ISC).
 */
const DUR = 0.7

export function TurkishLiraIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'turkish lira'}
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
        <path d="M15 4 5 9" />
        <path d="m15 8.5-10 5" />
        <path d="M18 12a9 9 0 0 1-9 9V3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'turkish-lira',
  gesture: 'it rings up',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['money', 'currency', 'turkish', 'lira'],
}

export default TurkishLiraIcon
