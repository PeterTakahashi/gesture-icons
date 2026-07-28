import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, pen } from '../core/easings'

/**
 * Check — it checks off. The tick un-draws instantly fast, then a pen
 * redraws it stroke-order: down-stroke, then the long climb. The redraw
 * is the beat that reads as "checked off," not a fade.
 * Base geometry: Lucide `check` (ISC).
 */
const DUR = 0.9

export function CheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'check'}
      {...hoverProps}
    >
      <motion.path
        d="M20 6 9 17l-5-5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.75], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'check',
  gesture: 'it checks off',
  family: 'draw-on' as const,
  section: 'Interface',
  tags: ['done', 'ok', 'complete', 'tick'],
}

export default CheckIcon
