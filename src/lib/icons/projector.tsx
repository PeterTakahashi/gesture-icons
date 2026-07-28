import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Projector — it projects. The three flash rays above the lens are Lucide's
 * own glyph (always visible at rest); the gesture erases them and writes
 * them back on, staggered outward from the lens, so the resting picture
 * never changes — only the moment they redraw does. Body and lens hold still.
 * Spec called for two rays; the geometry actually offers three, so all three
 * play the same beat rather than leaving one arbitrarily untouched.
 * Base geometry: Lucide `projector` (ISC).
 */
const DUR = 0.9

export function ProjectorIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const ray = (redrawStart: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        times: [0, 0.14, redrawStart, redrawEnd],
        ease: [easeInCubic, 'linear', easeOutQuart],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'projector'}
      {...hoverProps}
    >
      <motion.path d="M5 7 3 5" initial="normal" animate={controls} variants={ray(0.2, 0.5)} />
      <motion.path d="M9 6V3" initial="normal" animate={controls} variants={ray(0.28, 0.6)} />
      <motion.path d="m13 7 2-2" initial="normal" animate={controls} variants={ray(0.36, 0.7)} />
      <circle cx="9" cy="13" r="3" />
      <path d="M11.83 12H20a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h2.17" />
      <path d="M16 16h2" />
    </svg>
  )
}

export const meta = {
  name: 'projector',
  gesture: 'it projects',
  family: 'draw-on' as const,
  section: 'Devices',
  tags: ['presentation', 'beam'],
}

export default ProjectorIcon
