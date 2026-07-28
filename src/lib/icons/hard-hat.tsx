import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Hard hat — safety first. It lifts, seats back down, and gets a quick
 * knuckle-tap press right after it settles — the little squash a hand
 * gives a helmet to check it's on right.
 * Base geometry: Lucide `hard-hat` (ISC).
 */
const DUR = 0.9

export function HardHatIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hard hat'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, scaleY: 1 },
          animate: {
            y: [0, -1.5, 0.5, 0],
            scaleY: [1, 1, 1, 1, 0.96, 1],
            transition: {
              duration: DUR,
              y: { times: [0, 0.32, 0.62, 0.85], ease: [easeOutQuart, easeInOutCubic, easeOutQuart] },
              scaleY: { times: [0, 0.85, 0.9, 0.92, 0.96, 1], ease: ['linear', 'linear', easeInCubic, settleBack, 'linear'] },
            },
          },
        }}
      >
        <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
        <path d="M14 6a6 6 0 0 1 6 6v3" />
        <path d="M4 15v-3a6 6 0 0 1 6-6" />
        <rect x="2" y="15" width="20" height="4" rx="1" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'hard-hat',
  gesture: 'safety first',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['construction', 'safety', 'work'],
}

export default HardHatIcon
