import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Chevron up — it nods up. Two diminishing beats, like an eager nod: up,
 * settle, up again smaller, settle home.
 * Base geometry: Lucide `chevron-up` (ISC).
 */
const DUR = 0.85

export function ChevronUpIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chevron up'}
      {...hoverProps}
    >
      <motion.path
        d="m18 15-6-6-6 6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2, 0, -1, 0, 0],
            transition: {
              duration: DUR,
              times: [0, 0.2, 0.4, 0.55, 0.7, 1],
              ease: [easeOutQuart, easeInCubic, easeOutQuart, easeInCubic, 'linear'],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'chevron-up',
  gesture: 'it nods up',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['up', 'collapse'],
}

export default ChevronUpIcon
