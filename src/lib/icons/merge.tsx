import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutQuart, pen } from '../core/easings'

/**
 * Merge — it does what it means. All three strokes are one boolean event:
 * they erase together and the pen writes them back on in the same window,
 * on one clock, so the two branches read as combining into one rather than
 * three unrelated lines redrawing themselves independently.
 * Base geometry: Lucide `merge` (ISC).
 */
const DUR = 1.1

export function MergeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const draw: Variants = {
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, times: [0, 0.24, 0.4, 0.86], ease: [easeInCubic, 'linear', pen] },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'merge'}
      {...hoverProps}
    >
      <motion.path d="m8 6 4-4 4 4" initial="normal" animate={controls} variants={draw} />
      <motion.path
        d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.24, 0.4, 0.86], ease: [easeInCubic, 'linear', easeInOutQuart] },
          },
        }}
      />
      <motion.path d="m20 22-5-5" initial="normal" animate={controls} variants={draw} />
    </svg>
  )
}

export const meta = {
  name: 'merge',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['boolean', 'layers', 'combine', 'merge'],
}

export default MergeIcon
