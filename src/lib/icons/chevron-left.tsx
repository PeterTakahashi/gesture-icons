import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Chevron left — it beckons left. Two diminishing beats: left, settle, left
 * again smaller, settle home.
 * Base geometry: Lucide `chevron-left` (ISC).
 */
const DUR = 0.85

export function ChevronLeftIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chevron left'}
      {...hoverProps}
    >
      <motion.path
        d="m15 18-6-6 6-6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -2, 0, -1, 0, 0],
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
  name: 'chevron-left',
  gesture: 'it beckons left',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['left', 'back'],
}

export default ChevronLeftIcon
