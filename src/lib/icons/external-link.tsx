import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * External link — the arrow steps out. Only the diagonal arrow and its
 * corner travel: they leave up-right past the frame's own edge, are
 * repositioned off-frame where nobody is watching, and arrive back from
 * the opposite corner. The box never moves — it is the thing being left.
 * Base geometry: Lucide `external-link` (ISC).
 */
const DUR = 1.0

export function ExternalLinkIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'external link'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 3.5, 3.5, -3.5, -3.5, 0],
            y: [0, -3.5, -3.5, 3.5, 3.5, 0],
            transition: {
              duration: DUR,
              times: [0, 0.3, 0.5, 0.5, 0.55, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      >
        <path d="M15 3h6v6" />
        <path d="M10 14 21 3" />
      </motion.g>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  )
}

export const meta = {
  name: 'external-link',
  gesture: 'the arrow steps out',
  family: 'travel' as const,
  section: 'Interface',
  tags: ['open', 'new-tab', 'out'],
}

export default ExternalLinkIcon
