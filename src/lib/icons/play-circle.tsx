import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Play circle — play, in a ring. VARIANT(play): the triangle presses in
 * and pops forward exactly as it does bare; the ring breathes with it, a
 * small shared inhale on the same beat, never its own clock.
 * Base geometry: Lucide `play-circle` (ISC).
 */
const DUR = 0.8

export function PlayCircleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'play circle'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" cy="12" r="10"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 0.85], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, x: 0 },
          animate: {
            scale: [1, 0.9, 1.08, 1],
            x: [0, 0, 1.4, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'play-circle',
  gesture: 'play, in a ring',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['media', 'start', 'watch'],
}

export default PlayCircleIcon
