import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, pen } from '../core/easings'

/**
 * Ampersand — and another thing. Erased fast, then written back as one pen
 * flourish: the long loop-and-tail stroke first, the small closing link at
 * the top of the loop last — the order a hand actually finishes an "&".
 * Base geometry: Lucide `ampersand` (ISC).
 */
const DUR = 1.1

export function AmpersandIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ampersand'}
      {...hoverProps}
    >
      <motion.path
        d="M17.5 12a8 8 0 0 1-8 8A4.5 4.5 0 0 1 5 15.5c0-6 8-4 8-8.5a3 3 0 1 0-6 0c0 3 2.5 8.5 12 13"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.32, 0.85], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
      {/* the closing link at the top of the loop, written last */}
      <motion.path
        d="M16 12h3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.75, 0.98], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'ampersand',
  gesture: 'and another thing',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['and', 'typography'],
}

export default AmpersandIcon
