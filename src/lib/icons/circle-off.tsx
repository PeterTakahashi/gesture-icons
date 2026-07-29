import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Circle off — it is switched off. The slash erases then pen-redraws
 * across the broken ring (never a fade) while the whole circle gives one
 * small defeated sag-and-tilt about its own center and settles.
 * Base geometry: Lucide `circle-off` (ISC).
 */
const DUR = 0.85

export function CircleOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'circle off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 2, 0],
            rotate: [0, 3, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65" />
        <path d="M19.08 19.08A10 10 0 1 1 4.92 4.92" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'circle-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Shapes',
  tags: ['disabled', 'off', 'circle'],
}

export default CircleOffIcon
