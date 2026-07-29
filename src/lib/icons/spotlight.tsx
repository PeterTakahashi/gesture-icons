import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, pen } from '../core/easings'

/**
 * Spotlight — it finds its subject. The beam rays are lit at rest in
 * Lucide's own glyph, so the gesture opens by cutting them an instant
 * (house lights down), redraws them by length as the head sweeps to the
 * mark, and holds them lit through the finish — a beam that reappears
 * fuller than the blip it started from reads as finding the subject, and
 * the last frame matches the static icon exactly. The stand never moves.
 * Base geometry: Lucide `spotlight` (ISC).
 */
const DUR = 1.0

export function SpotlightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const beam = (redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1, 1],
      transition: {
        duration: DUR,
        times: [0, 0.1, 0.24, redrawEnd, 1],
        ease: [easeInOutCubic, 'linear', pen, 'linear'],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'spotlight'}
      {...hoverProps}
    >
      <path d="M8 9V2" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '8px 9px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, -6, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M7.61 6.3a3 3 0 0 0-3.92 1.3l-1.38 2.79a3 3 0 0 0 1.3 3.91l6.89 3.597a1 1 0 0 0 1.342-.447l3.106-6.211a1 1 0 0 0-.447-1.341z" />
        <motion.path d="M15.295 19.562 16 22" initial="normal" animate={controls} variants={beam(0.46)} />
        <motion.path d="m17 16 3.758 2.098" initial="normal" animate={controls} variants={beam(0.5)} />
        <motion.path d="m19 12.5 3.026-.598" initial="normal" animate={controls} variants={beam(0.54)} />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'spotlight',
  gesture: 'it finds its subject',
  family: 'secondary' as const,
  section: 'Media',
  tags: ['stage', 'theater', 'focus', 'spotlight'],
}

export default SpotlightIcon
