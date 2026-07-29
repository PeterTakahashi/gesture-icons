import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Zodiac aries — a constellation shimmer. The whole glyph gathers in and
 * twists (ease-in, the pull), then blooms back out past its own size
 * before settling — starlight energy, small and quick.
 * Base geometry: Lucide `zodiac-aries` (ISC).
 */
const DUR = 0.8

export function ZodiacAriesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'zodiac aries'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.85, 1.08, 1],
            rotate: [0, -8, 3, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 7.5a4.5 4.5 0 1 1 5 4.5" />
        <path d="M7 12a4.5 4.5 0 1 1 5-4.5V21" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'zodiac-aries',
  gesture: 'a constellation shimmer',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['zodiac', 'astrology', 'star', 'aries'],
}

export default ZodiacAriesIcon
