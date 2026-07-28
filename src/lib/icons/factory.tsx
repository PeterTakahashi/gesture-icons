import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutExpo } from '../core/easings'

/**
 * Factory — the shift starts. Two short smoke curls, absent from Lucide's
 * resting glyph, draw on above the stacks staggered 100ms apart and erase
 * again — dash length, never a fade, rest-hidden at pathLength 0.001. The
 * building and its indicator lights never move.
 * Base geometry: Lucide `factory` (ISC).
 */
const DUR = 1.0

export function FactoryIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'factory'}
      {...hoverProps}
    >
      <path d="M12 16h.01" />
      <path d="M16 16h.01" />
      <path d="M3 19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5a.5.5 0 0 0-.769-.422l-4.462 2.844A.5.5 0 0 1 15 10.5v-2a.5.5 0 0 0-.769-.422L9.77 10.922A.5.5 0 0 1 9 10.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
      <path d="M8 16h.01" />
      {/* smoke: absent at rest, drawn on then erased */}
      {[{ d: 'M9 5c1.6-1.2-1.6-1.2 0-4', delay: 0 }, { d: 'M14.5 4c1.6-1.2-1.6-1.2 0-4', delay: 0.1 }].map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          strokeWidth={strokeWidth * 0.85}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 0.001, opacity: 0 },
            animate: {
              pathLength: [0.001, 0.001, 1, 1, 0.001, 0.001],
              opacity: [0, 0, 1, 1, 0, 0],
              transition: {
                duration: DUR,
                delay: l.delay,
                pathLength: { times: [0, 0.2, 0.4, 0.62, 0.8, 1], ease: ['linear', easeOutExpo, 'linear', easeInOutCubic, 'linear'] },
                opacity: { times: [0, 0.19, 0.2, 0.79, 0.8, 1], ease: 'linear' },
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'factory',
  gesture: 'the shift starts',
  family: 'secondary' as const,
  section: 'Buildings',
  tags: ['industry', 'plant', 'manufacturing'],
}

export default FactoryIcon
