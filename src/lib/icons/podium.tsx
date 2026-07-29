import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint, settleBack } from '../core/easings'

/**
 * Podium — the winner steps up. The #1 block (with its flag) rises
 * proudly with a small overshoot, while the flanking blocks dip in
 * deference at the same time, then everything settles back level.
 * Base geometry: Lucide `podium` (ISC).
 */
const DUR = 1.0

export function PodiumIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'podium'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.8, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.6, 1], ease: [easeOutQuint, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 6V2h-1" />
        <path d="M9 21V11a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v10" />
      </motion.g>
      <motion.path
        d="M9 15a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.6, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.6, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'podium',
  gesture: 'the winner steps up',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['winner', 'rank', 'ceremony', 'podium'],
}

export default PodiumIcon
