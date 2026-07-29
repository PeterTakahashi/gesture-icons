import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Guitar — it strums once. The body takes a single decaying shake — the
 * resonance of the strum — while the small mark over the strings does a
 * quick vertical shiver, as if still moving; the neck and headstock, being
 * rigidly fretted, hold still.
 * Base geometry: Lucide `guitar` (ISC).
 */
const DUR = 0.55

export function GuitarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'guitar'}
      {...hoverProps}
    >
      <path d="m11.9 12.1 4.514-4.514" />
      <path d="M20.1 2.3a1 1 0 0 0-1.4 0l-1.114 1.114A2 2 0 0 0 17 4.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 17.828 7h1.344a2 2 0 0 0 1.414-.586L21.7 5.3a1 1 0 0 0 0-1.4z" />
      <motion.path
        d="m6 16 2 2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M8.23 9.85A3 3 0 0 1 11 8a5 5 0 0 1 5 5 3 3 0 0 1-1.85 2.77l-.92.38A2 2 0 0 0 12 18a4 4 0 0 1-4 4 6 6 0 0 1-6-6 4 4 0 0 1 4-4 2 2 0 0 0 1.85-1.23z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 1.5, -1.5, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.5, 0.74, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'guitar',
  gesture: 'it strums once',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['music', 'instrument', 'guitar'],
}

export default GuitarIcon
