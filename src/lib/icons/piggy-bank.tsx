import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Piggy bank — it gets fed. A coin drops in from above the frame, falls
 * with gravity onto the pig's back, and vanishes right at the slot line —
 * clipped away the instant it would overlap the pig's outline, not faded.
 * The pig gives a happy little dip on the gulp. Like `funnel.tsx`.
 * Base geometry: Lucide `piggy-bank` (ISC).
 */
const DUR = 1.05

export function PiggyBankIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const fill = color === 'currentColor' ? 'currentColor' : color
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'piggy bank'}
      {...hoverProps}
    >
      <defs>
        {/* only the area above the pig's back is visible — the coin vanishes into the slot, not into thin air */}
        <clipPath id="gi-piggy-clip">
          <rect x="0" y="-10" width="24" height="14" />
        </clipPath>
      </defs>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, -0.3, 0],
            transition: { duration: DUR, times: [0, 0.46, 0.6, 0.78], ease: [easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
        <path d="M16 10h.01" />
        <path d="M2 8v1a2 2 0 0 0 2 2h1" />
      </motion.g>
      <motion.circle
        cx="14" r="1.4" fill={fill} stroke="none"
        clipPath="url(#gi-piggy-clip)"
        initial="normal"
        animate={controls}
        variants={{
          normal: { cy: -4, r: 1.4 },
          animate: {
            cy: [-4, 3.5, 5, 8],
            r: [1.4, 1.4, 1.2, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.42, 0.55], ease: [gravity, easeInOutCubic, 'linear'] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'piggy-bank',
  gesture: 'it gets fed',
  family: 'secondary' as const,
  section: 'Commerce & feedback',
  tags: ['savings', 'money', 'coin', 'bank'],
}

export default PiggyBankIcon
