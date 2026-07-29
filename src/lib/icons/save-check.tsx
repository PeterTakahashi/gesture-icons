import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, gravity, pen } from '../core/easings'

/**
 * Save check — it is confirmed. VARIANT(check): the check erases then
 * pen-redraws, and the save body takes a single y+0.6 dip exactly on the
 * frame the check lands — the confirmation landing as an impact, not a
 * fade.
 * Base geometry: Lucide `save-check` (ISC).
 */
const DUR = 1.0

export function SaveCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'save check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.78, 0.85, 1], ease: ['linear', gravity, easeOutQuart] },
          },
        }}
      >
        <path d="M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4v4.35" />
        <path d="M17 15.13V14a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
        <path d="M7 3v4a1 1 0 0 0 1 1h7" />
      </motion.g>
      <motion.path
        d="m16 19 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.45, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'save-check',
  gesture: 'it is confirmed',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['done', 'verified', 'save', 'check'],
}

export default SaveCheckIcon
