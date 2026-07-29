import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Philippine peso — it rings up. A stamp with a tiny turn: the whole glyph
 * presses down, twists a hair, and pops back past its own size before
 * settling — cha-ching without the sound, same beat as dollar-sign.tsx.
 * Base geometry: Lucide `philippine-peso` (ISC).
 */
const DUR = 0.7

export function PhilippinePesoIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'philippine peso'}
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
        <path d="M20 11H4" />
        <path d="M20 7H4" />
        <path d="M7 21V4a1 1 0 0 1 1-1h4a1 1 0 0 1 0 12H7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'philippine-peso',
  gesture: 'it lands with intent',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['money', 'currency', 'philippine', 'peso'],
}

export default PhilippinePesoIcon
