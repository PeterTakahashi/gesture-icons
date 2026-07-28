import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Medal — VARIANT(award): the disc swings, hinged where the ribbon meets it
 * at the top, decaying — just pinned on, settling to hang straight. The
 * ribbon tails hold still; they're anchored at the shoulders, not the disc.
 * Base geometry: Lucide `medal` (ISC).
 */
const DUR = 1.05

export function MedalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'medal'}
      {...hoverProps}
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 2, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.56, 0.76, 0.92], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="12" cy="17" r="5" />
        <path d="M12 18v-2h-.5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'medal',
  gesture: 'it is pinned on',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['award', 'winner', 'honor'],
}

export default MedalIcon
