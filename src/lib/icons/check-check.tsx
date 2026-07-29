import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, easeOutQuart, easeInOutCubic, pen } from '../core/easings'

/**
 * Check-check — it is confirmed. VARIANT(check): the first tick erases then
 * pen-redraws exactly as check.tsx does; the second tick follows a beat
 * behind, its own erase-and-redraw landing later — the moment it finishes
 * is the landing frame, where the whole mark dips y+0.6 as the second
 * confirmation lands, then settles back to rest.
 * Base geometry: Lucide `check-check` (ISC).
 */
const DUR = 0.95

export function CheckCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'check check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.78, 0.84, 0.92], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <motion.path
          d="M18 6 7 17l-5-5"
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [1, 0.001, 0.001, 1],
              transition: { duration: DUR, times: [0, 0.16, 0.3, 0.6], ease: [easeInOutQuart, 'linear', pen] },
            },
          }}
        />
        <motion.path
          d="m22 10-7.5 7.5L13 16"
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [1, 0.001, 0.001, 1],
              transition: { duration: DUR, times: [0, 0.24, 0.38, 0.78], ease: [easeInOutQuart, 'linear', pen] },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'check-check',
  gesture: 'it is confirmed',
  family: 'draw-on' as const,
  section: 'Interface',
  tags: ['done', 'verified', 'check'],
}

export default CheckCheckIcon
