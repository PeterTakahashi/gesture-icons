import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Heater — it radiates. The two heat squiggles are visible at rest (they are
 * part of Lucide's glyph), so the gesture erases them fast and pen-redraws
 * them upward slowly — warmth rising, staggered 80ms apart. Body, grille and
 * indicator lights never move.
 * Base geometry: Lucide `heater` (ISC).
 */
const DUR = 1.3

export function HeaterIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const heat = (delay: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, delay, times: [0, 0.15, 0.3, 0.95], ease: [easeInCubic, 'linear', easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'heater'}
      {...hoverProps}
    >
      <motion.path d="M11 8c2-3-2-3 0-6" initial="normal" animate={controls} variants={heat(0)} />
      <motion.path d="M15.5 8c2-3-2-3 0-6" initial="normal" animate={controls} variants={heat(0.08)} />
      <path d="M6 10h.01" />
      <path d="M6 14h.01" />
      <path d="M10 16v-4" />
      <path d="M14 16v-4" />
      <path d="M18 16v-4" />
      <path d="M20 6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" />
      <path d="M5 20v2" />
      <path d="M19 20v2" />
    </svg>
  )
}

export const meta = {
  name: 'heater',
  gesture: 'it radiates',
  family: 'draw-on' as const,
  section: 'Home',
  tags: ['warm', 'winter'],
}

export default HeaterIcon
