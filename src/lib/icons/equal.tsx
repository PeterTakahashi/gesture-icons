import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Equal — it balances. The two bars wind up apart a hair, converge toward
 * each other, hold at the balanced gap — equal — then settle back to rest.
 * Both bars run on one clock so the "equal" moment genuinely lands together.
 * Base geometry: Lucide `equal` (ISC).
 */
const DUR = 1.0

export function EqualIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'equal'}
      {...hoverProps}
    >
      <motion.line
        x1="5" x2="19" y1="9" y2="9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y1: 9, y2: 9 },
          animate: {
            y1: [9, 8.8, 9.8, 9.8, 9],
            y2: [9, 8.8, 9.8, 9.8, 9],
            transition: {
              duration: DUR,
              times: [0, 0.18, 0.42, 0.68, 1],
              ease: [easeInOutCubic, easeOutQuart, 'linear', settleBack],
            },
          },
        }}
      />
      <motion.line
        x1="5" x2="19" y1="15" y2="15"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y1: 15, y2: 15 },
          animate: {
            y1: [15, 15.2, 14.2, 14.2, 15],
            y2: [15, 15.2, 14.2, 14.2, 15],
            transition: {
              duration: DUR,
              times: [0, 0.18, 0.42, 0.68, 1],
              ease: [easeInOutCubic, easeOutQuart, 'linear', settleBack],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'equal',
  gesture: 'it balances',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['math', 'same'],
}

export default EqualIcon
