import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Shuffle — the crossover breathes. The two diagonals of the X each NUDGE
 * along their own axis — wind up against it, drive along it, settle back —
 * opposite phase so one is already underway when the other starts (a 10%
 * lead), which is what makes the crossing itself feel alive. Each arrowhead
 * rides inside its own diagonal's group, so it travels with its line.
 * Base geometry: Lucide `shuffle` (ISC).
 */
const DUR = 0.8
// "/" diagonal: bottom-left (2,18) to top-right (22,6)
const DIR_A = { x: 20 / 23.324, y: -12 / 23.324 }
// "\" diagonal: top-left (2,6) to bottom-right (22,18)
const DIR_B = { x: 20 / 23.324, y: 12 / 23.324 }
const LEAD_A = 0.5
const DRIVE = 2.5

export function ShuffleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shuffle'}
      {...hoverProps}
    >
      {/* "/" diagonal — drawn unbroken, on top at the crossing */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -LEAD_A * DIR_A.x, DRIVE * DIR_A.x, 0],
            y: [0, -LEAD_A * DIR_A.y, DRIVE * DIR_A.y, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.6, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22" />
        <path d="m18 2 4 4-4 4" />
      </motion.g>
      {/* "\" diagonal — broken where the other crosses over it; leads by 10% */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -LEAD_A * DIR_B.x, DRIVE * DIR_B.x, 0],
            y: [0, -LEAD_A * DIR_B.y, DRIVE * DIR_B.y, 0],
            transition: { duration: DUR, delay: 0.08, times: [0, 0.2, 0.6, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M2 6h1.972a4 4 0 0 1 3.6 2.2" />
        <path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" />
        <path d="m18 14 4 4-4 4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'shuffle',
  gesture: 'the paths swap',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['random', 'mix'],
}

export default ShuffleIcon
