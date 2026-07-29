import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint, gravity } from '../core/easings'

/**
 * Popcorn — it pops. Two kernels (rest-hidden at scale 0.001, tucked just
 * inside the box mouth) pop up out of the box and fall back in with
 * gravity, 100ms apart. The box gives a small shiver on each impact — it
 * is the box's ink, not a fade, that shows they were never there at rest.
 * Base geometry: Lucide `popcorn` (ISC).
 */
const DUR = 1.0

export function PopcornIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const fillColor = color === 'currentColor' ? 'currentColor' : color
  const kernel = (delay: number): Variants => ({
    normal: { scale: 0.001, y: 0 },
    animate: {
      scale: [0.001, 1.2, 1, 1, 0.001],
      y: [0, -4, -4, 2, 2],
      transition: { duration: DUR, delay, times: [0, 0.25, 0.4, 0.7, 0.85], ease: [easeOutQuint, 'linear', gravity, easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'popcorn'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 0.6, 0, 0, 0.6, 0, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.25, 0.28, 0.32, 0.35, 0.38, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4" />
        <path d="M10 22 9 8" />
        <path d="m14 22 1-14" />
        <path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z" />
        <motion.circle cx="9" cy="7" r="1.1" fill={fillColor} stroke="none" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial="normal" animate={controls} variants={kernel(0)} />
        <motion.circle cx="14" cy="7" r="1.1" fill={fillColor} stroke="none" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial="normal" animate={controls} variants={kernel(0.1)} />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'popcorn',
  gesture: 'it pops',
  family: 'secondary' as const,
  section: 'Food & drink',
  tags: ['movie', 'snack', 'popcorn'],
}

export default PopcornIcon
