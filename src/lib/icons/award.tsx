import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Award — the medal swings. Only the disc moves, hinged where the ribbons
 * meet it at the top — decaying swings, like a medal just pinned on and
 * settling to hang straight. The ribbon legs hold still; they're anchored
 * at the shoulders, not the disc.
 * Base geometry: Lucide `award` (ISC).
 */
const DUR = 1.05

export function AwardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'award'}
      {...hoverProps}
    >
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <motion.circle
        cx="12" cy="8" r="6"
        style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 2, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.56, 0.76, 0.92], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'award',
  gesture: 'the medal swings',
  family: 'rigid' as const,
  section: 'People',
  tags: ['medal', 'achievement', 'prize', 'badge'],
}

export default AwardIcon
