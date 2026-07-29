import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutExpo } from '../core/easings'

/**
 * Cooking pot — it simmers. The lid rattles against the rim in a quick
 * series of small bumps, and two ticks of steam draw themselves up through
 * the gaps between the rattles — dash length, never a fade — and are erased
 * again as they dissipate. Handles and body never move.
 * Base geometry: Lucide `cooking-pot` (ISC).
 */
const DUR = 1.0

export function CookingPotIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const steam = (delay: number): Variants => ({
    normal: { pathLength: 0.001, opacity: 0 },
    animate: {
      pathLength: [0.001, 0.001, 1, 1, 0.001, 0.001],
      opacity: [0, 0, 1, 1, 0, 0],
      transition: {
        duration: DUR,
        delay,
        pathLength: { times: [0, 0.1, 0.4, 0.6, 0.85, 1], ease: ['linear', easeOutExpo, 'linear', easeInOutCubic, 'linear'] },
        opacity: { times: [0, 0.09, 0.1, 0.84, 0.85, 1], ease: 'linear' },
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cooking pot'}
      {...hoverProps}
    >
      <path d="M2 12h20" />
      <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -0.8, 0, -0.5, 0],
            transition: { duration: DUR, times: [0, 0.12, 0.24, 0.36, 0.48], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m4 8 16-4" />
        <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
      </motion.g>
      <motion.path
        d="M9 4.2v-2.6"
        strokeWidth={strokeWidth * 0.85}
        initial="normal"
        animate={controls}
        variants={steam(0.1)}
      />
      <motion.path
        d="M13.5 3.2v-2.6"
        strokeWidth={strokeWidth * 0.85}
        initial="normal"
        animate={controls}
        variants={steam(0.3)}
      />
    </svg>
  )
}

export const meta = {
  name: 'cooking-pot',
  gesture: 'it simmers',
  family: 'secondary' as const,
  section: 'Food & drink',
  tags: ['cook', 'stew', 'kitchen', 'cooking', 'pot'],
}

export default CookingPotIcon
