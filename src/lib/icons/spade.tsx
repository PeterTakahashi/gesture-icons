import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Spade — it trumps. A stamp with flourish: the whole suit presses down,
 * pops past its size with a little twist of the wrist, and lands square —
 * played on the table.
 * Base geometry: Lucide `spade` (ISC).
 */
const DUR = 0.75

export function SpadeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'spade'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.82, 1.14, 1],
            rotate: [0, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 18v4" />
        <path d="M2 14.499a5.5 5.5 0 0 0 9.591 3.675.6.6 0 0 1 .818.001A5.5 5.5 0 0 0 22 14.5c0-2.29-1.5-4-3-5.5l-5.492-5.312a2 2 0 0 0-3-.02L5 8.999c-1.5 1.5-3 3.2-3 5.5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'spade',
  gesture: 'it trumps',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['cards', 'suit', 'poker'],
}

export default SpadeIcon
