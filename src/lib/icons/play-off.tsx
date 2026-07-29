import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Play off — it is switched off. The slash erases and pen-redraws across the
 * triangle while it gives one small defeated tilt about its own center —
 * a 2-unit sag that settles rather than bounces.
 * Base geometry: Lucide `play-off` (ISC).
 */
const DUR = 0.9

export function PlayOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'play off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 3, 0],
            y: [0, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.45, 0.85], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m10.215 4.56 9.79 5.71a2 2 0 0 1 .003 3.458l-.393.23" />
        <path d="m16.042 16.042-8.034 4.686A2 2 0 0 1 5 19V5" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.38, 0.8], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'play-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['disabled', 'off', 'play'],
}

export default PlayOffIcon
