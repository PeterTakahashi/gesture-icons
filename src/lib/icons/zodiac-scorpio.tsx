import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuint, settleBack } from '../core/easings'

/**
 * Zodiac Scorpio — the constellation shimmers. The whole glyph gathers in
 * on an ease-in then blooms back past its own size before settling exactly
 * on the resting picture — small and quick, like a point of light catching
 * for a beat.
 * Base geometry: Lucide `zodiac-scorpio` (ISC).
 */
const DUR = 0.8

export function ZodiacScorpioIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'zodiac scorpio'}
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
        <path d="M10 19V5.5a1 1 0 0 1 5 0V17a2 2 0 0 0 2 2h5l-3-3" />
        <path d="m22 19-3 3" />
        <path d="M5 19V5.5a1 1 0 0 1 5 0" />
        <path d="M5 5.5A2.5 2.5 0 0 0 2.5 3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'zodiac-scorpio',
  gesture: 'scorpio shimmers',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['zodiac', 'astrology', 'star', 'scorpio'],
}

export default ZodiacScorpioIcon
