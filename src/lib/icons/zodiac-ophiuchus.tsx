import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuint, settleBack } from '../core/easings'

/**
 * Zodiac Ophiuchus — the constellation shimmers. The whole glyph gathers in
 * on an ease-in (a star dimming inward) then blooms back past its own size
 * before settling exactly on the resting picture — small and quick, like a
 * point of light catching for a beat.
 * Base geometry: Lucide `zodiac-ophiuchus` (ISC).
 */
const DUR = 0.8

export function ZodiacOphiuchusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'zodiac ophiuchus'}
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
            transition: {
              duration: DUR,
              times: [0, 0.35, 0.7, 1],
              ease: [[0.55, 0, 0.7, 0.3], easeOutQuint, settleBack],
            },
          },
        }}
      >
        <path d="M3 10A6.06 6.06 0 0 1 12 10 A6.06 6.06 0 0 0 21 10" />
        <path d="M6 3v12a6 6 0 0 0 12 0V3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'zodiac-ophiuchus',
  gesture: 'ophiuchus shimmers',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['zodiac', 'astrology', 'star', 'ophiuchus'],
}

export default ZodiacOphiuchusIcon
