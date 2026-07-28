import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Layers — the top sheet is lifted and dropped back on the pile.
 * The bands below compress in sequence: the middle is not hit by the sheet,
 * it is hit by the layer above it, so it sets off ~3% later on the same
 * curve, and the bottom 3% after that. Three layers leaving on the same
 * frame would be a rigid block, and a rigid block has no physics.
 * Base geometry: Lucide `layers` (ISC).
 */
const DUR = 1.0

export function LayersIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'layers'}
      {...hoverProps}
    >
      <motion.path
        d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -4.4, 0.7, -0.2, 0],
            transition: {
              duration: DUR,
              times: [0, 0.3, 0.56, 0.74, 1],
              ease: [easeOutQuart, gravity, easeOutQuart, easeInOutCubic],
            },
          },
        }}
      />
      <motion.path
        d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 1.3, -0.4, 0],
            transition: { duration: DUR, times: [0, 0.53, 0.66, 0.82, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.85, -0.25, 0],
            transition: { duration: DUR, times: [0, 0.56, 0.69, 0.85, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'layers',
  gesture: 'the stack takes the drop',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['stack', 'sheets', 'levels'],
}

export default LayersIcon
