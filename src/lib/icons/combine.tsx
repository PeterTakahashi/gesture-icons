import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Combine — the boolean is unite: the two squares actually draw together,
 * drifting toward each other along their shared diagonal for a beat before
 * settling back to exactly the layout Lucide drew. The connector brackets
 * are the fixed pipe the merge flows through, so they hold still.
 * Base geometry: Lucide `combine` (ISC).
 */
const DUR = 1.0

export function CombineIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'combine'}
      {...hoverProps}
    >
      <path d="M14 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
      <path d="M19 3a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
      <path d="m7 15 3 3" />
      <path d="m7 21 3-3H5a2 2 0 0 1-2-2v-2" />
      <motion.rect
        x="14" y="14" width="7" height="7" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1, 0],
            y: [0, -1, 0],
            transition: { duration: DUR, times: [0, 0.55, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.rect
        x="3" y="3" width="7" height="7" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1, 0],
            y: [0, 1, 0],
            transition: { duration: DUR, times: [0, 0.55, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'combine',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['boolean', 'layers', 'combine'],
}

export default CombineIcon
