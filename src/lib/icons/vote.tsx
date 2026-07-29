import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Vote — the ballot drops. The check falls from just above its rest spot
 * with real gravity and stops dead — no bounce of its own — and the box it
 * lands in takes the hit instead, dipping and springing back. Counted.
 * Base geometry: Lucide `vote` (ISC).
 */
const DUR = 0.9

export function VoteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'vote'}
      {...hoverProps}
    >
      <motion.path
        d="m9 12 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [-2, -2, 0, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.5, 1], ease: [gravity, 'linear'] },
          },
        }}
      />
      <motion.path
        d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1, 0.94, 1.02, 1],
            transition: { duration: DUR, times: [0, 0.48, 0.58, 0.75, 0.9], ease: ['linear', easeInCubic, easeOutQuart, 'linear'] },
          },
        }}
      />
      <path d="M22 19H2" />
    </svg>
  )
}

export const meta = {
  name: 'vote',
  gesture: 'the ballot drops',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['ballot', 'democracy', 'choice', 'vote'],
}

export default VoteIcon
