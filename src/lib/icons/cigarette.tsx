import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, pen } from '../core/easings'

/**
 * Cigarette — it burns down. The body line shortens from the lit end,
 * slowly, and is pen-redrawn back to its length — burning down, not
 * erasing. A tiny ember tick flickers at the burning tip only during the
 * held, shortened frame, dash-gated and rest-hidden the rest of the time.
 * Base geometry: Lucide `cigarette` (ISC).
 */
const DUR = 1.3

export function CigaretteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cigarette'}
      {...hoverProps}
    >
      <motion.path
        d="M17 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.85, 0.85, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.72, 1], ease: [easeInOutCubic, 'linear', pen] },
          },
        }}
      />
      <path d="M18 8c0-2.5-2-2.5-2-5" />
      <path d="M21 16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M22 8c0-2.5-2-2.5-2-5" />
      <path d="M7 12v4" />
      {/* ember: rest-hidden, flickers at the burning tip only during the hold */}
      <motion.path
        d="M19.3 13.6h.8"
        strokeWidth={strokeWidth * 0.75}
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 0.001, opacity: 0 },
          animate: {
            pathLength: [0.001, 0.001, 1, 1, 0.001, 0.001, 1, 1, 0.001, 0.001],
            opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
            transition: {
              duration: DUR,
              times: [0, 0.34, 0.38, 0.5, 0.54, 0.58, 0.62, 0.68, 0.72, 1],
              ease: 'linear',
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cigarette',
  gesture: 'it burns down',
  family: 'draw-on' as const,
  section: 'Objects',
  tags: ['smoke', 'habit', 'cigarette'],
}

export default CigaretteIcon
