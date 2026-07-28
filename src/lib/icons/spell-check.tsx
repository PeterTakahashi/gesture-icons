import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart, pen } from '../core/easings'

/**
 * Spell check — the check mark erases and the pen rewrites it; the
 * whole glyph takes a tiny landing dip exactly as the tick lands, since
 * that is the instant the word is approved. The letters hold still.
 * Base geometry: Lucide `spell-check` (ISC).
 */
const DUR = 1.0

export function SpellCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'spell check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.72, 0.82, 0.9, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="m6 16 6-12 6 12" />
        <path d="M8 12h8" />
        <motion.path
          d="m16 20 2 2 4-4"
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [1, 0.001, 0.001, 1],
              transition: { duration: DUR, times: [0, 0.18, 0.32, 0.7], ease: [easeInOutQuart, 'linear', pen] },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'spell-check',
  gesture: 'it approves the word',
  family: 'draw-on' as const,
  section: 'Text & editing',
  tags: ['grammar', 'correct'],
}

export default SpellCheckIcon
