import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, gravity, pen } from '../core/easings'

/**
 * Star check — it is confirmed. VARIANT(check): the check erases then
 * pen-redraws, and the star body takes a single y+0.6 dip exactly on the
 * frame the check lands — the confirmation reading as a small impact.
 * Base geometry: Lucide `star-check` (ISC).
 */
const DUR = 1.0

export function StarCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'star check'}
      {...hoverProps}
    >
      <motion.path
        d="m19.06 12.501 2.78-2.707a.53.53 0 0 0-.294-.905l-5.166-.755a2.1 2.1 0 0 1-1.595-1.16l-2.31-4.68a.53.53 0 0 0-.95.001L9.216 6.974a2.1 2.1 0 0 1-1.597 1.16l-5.165.755a.53.53 0 0 0-.294.906l3.736 3.637a2.1 2.1 0 0 1 .611 1.879l-.88 5.139a.53.53 0 0 0 .769.56l4.617-2.428.027-.014"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.78, 0.85, 1], ease: ['linear', gravity, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="m15 18 2 2 4-4"
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
  name: 'star-check',
  gesture: 'it is confirmed',
  family: 'draw-on' as const,
  section: 'Commerce & feedback',
  tags: ['done', 'verified', 'star', 'check'],
}

export default StarCheckIcon
