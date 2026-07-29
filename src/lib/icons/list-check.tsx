import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * List check — it is confirmed. VARIANT(check): the check erases then
 * pen-redraws, exactly as `check.tsx`; the list body dips y+0.6 exactly on
 * the frame it finishes writing.
 * Base geometry: Lucide `list-check` (ISC).
 */
const DUR = 0.9

export function ListCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.65, 0.75, 0.9], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M16 5H3" />
        <path d="M16 12H3" />
        <path d="M11 19H3" />
      </motion.g>
      <motion.path
        d="m15 18 2 2 4-4"
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
  name: 'list-check',
  gesture: 'it is confirmed',
  family: 'draw-on' as const,
  section: 'Text & editing',
  tags: ['done', 'verified', 'list', 'check'],
}

export default ListCheckIcon
