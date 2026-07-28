import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Air vent — the air flows. This glyph's only moving vanes are its two flap
 * curves (the housing and its single straight louver line are the fixed
 * grille) — each NUDGEs down-then-up, the second 40ms behind the first: a
 * breath passing through the two dampers.
 * Base geometry: Lucide `air-vent` (ISC).
 */
const DUR = 0.8

export function AirVentIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const nudge = (delay: number): Variants => ({
    normal: { y: 0 },
    animate: {
      y: [0, -0.3, 0.8, 0],
      transition: { duration: DUR, delay, times: [0, 0.2, 0.55, 0.85], ease: [easeInOutCubic, settleBack, easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'air vent'}
      {...hoverProps}
    >
      <motion.path d="M18 17.5a2.5 2.5 0 1 1-4 2.03V12" initial="normal" animate={controls} variants={nudge(0)} />
      <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 8h12" />
      <motion.path d="M6.6 15.572A2 2 0 1 0 10 17v-5" initial="normal" animate={controls} variants={nudge(0.04)} />
    </svg>
  )
}

export const meta = {
  name: 'air-vent',
  gesture: 'the air flows',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['hvac', 'climate'],
}

export default AirVentIcon
