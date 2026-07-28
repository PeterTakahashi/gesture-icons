import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { pen, easeInOutCubic, easeInCubic } from '../core/easings'

/**
 * Flashlight — it sweeps the dark. A beam draws itself on above the lens,
 * the body rotates about the grip while it holds, then the beam erases as
 * the body settles back — one look around, drawn by length, never a fade.
 * Base geometry: Lucide `flashlight` (ISC).
 */
const DUR = 1.1

export function FlashlightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const beam = (delay: number) => ({
    normal: { pathLength: 0.001, opacity: 0 },
    animate: {
      pathLength: [0.001, 1, 1, 0.001],
      opacity: [0, 1, 1, 0],
      transition: {
        duration: DUR,
        delay,
        pathLength: { times: [0, 0.28, 0.72, 0.92], ease: [pen, 'linear', easeInCubic] },
        opacity: { times: [0, 0.02, 0.9, 0.92], ease: 'linear' },
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'flashlight'}
      {...hoverProps}
    >
      <motion.path strokeWidth={strokeWidth * 0.8} d="M8 2 5 0.3" initial="normal" animate={controls} variants={beam(0)} />
      <motion.path strokeWidth={strokeWidth * 0.8} d="M12 2 12 0" initial="normal" animate={controls} variants={beam(0.04)} />
      <motion.path strokeWidth={strokeWidth * 0.8} d="M16 2 19 0.3" initial="normal" animate={controls} variants={beam(0.08)} />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 4, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 13v1" />
        <path d="M17 2a1 1 0 0 1 1 1v4a3 3 0 0 1-.6 1.8l-.6.8A4 4 0 0 0 16 12v8a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-8a4 4 0 0 0-.8-2.4l-.6-.8A3 3 0 0 1 6 7V3a1 1 0 0 1 1-1z" />
        <path d="M6 6h12" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'flashlight',
  gesture: 'it sweeps the dark',
  family: 'secondary' as const,
  section: 'Tools',
  tags: ['light', 'torch', 'search'],
}

export default FlashlightIcon
