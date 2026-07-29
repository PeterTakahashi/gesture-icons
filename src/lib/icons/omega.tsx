import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutQuart, pen } from '../core/easings'

/**
 * Omega — the limit is reached. The glyph erases then pen-redraws as one
 * continuous stroke. The path is drawn as Lucide wrote it — foot to foot —
 * so the write-on naturally begins on the left foot and lands on the
 * right foot: the stroke is bracketed by feet, not preceded by them.
 * Base geometry: Lucide `omega` (ISC).
 */
const DUR = 1.2

export function OmegaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'omega'}
      {...hoverProps}
    >
      <motion.path
        d="M3 20h4.5a.5.5 0 0 0 .5-.5v-.282a.52.52 0 0 0-.247-.437 8 8 0 1 1 8.494-.001.52.52 0 0 0-.247.438v.282a.5.5 0 0 0 .5.5H21"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.42, 1], ease: [easeInCubic, easeInOutQuart, pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'omega',
  gesture: 'the limit is reached',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['math', 'greek', 'end', 'omega'],
}

export default OmegaIcon
