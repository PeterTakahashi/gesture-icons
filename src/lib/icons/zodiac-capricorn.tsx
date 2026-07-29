import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Zodiac capricorn — a constellation shimmer. The whole glyph gathers in
 * and twists (ease-in, the pull), then blooms back out past its own size
 * before settling — starlight energy, small and quick.
 * Base geometry: Lucide `zodiac-capricorn` (ISC).
 */
const DUR = 0.8

export function ZodiacCapricornIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'zodiac capricorn'}
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
        <path d="M11 21a3 3 0 0 0 3-3V6.5a1 1 0 0 0-7 0" />
        <path d="M7 19V6a3 3 0 0 0-3-3h0" />
        <circle cx="17" cy="17" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'zodiac-capricorn',
  gesture: 'a constellation shimmer',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['zodiac', 'astrology', 'star', 'capricorn'],
}

export default ZodiacCapricornIcon
