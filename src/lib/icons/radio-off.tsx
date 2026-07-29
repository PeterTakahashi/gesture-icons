import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Radio off — it is switched off. The slash erases then pen-redraws across
 * the radio (never a fade) while the whole set gives one small defeated
 * sag-and-tilt about its own center and settles — the station going quiet.
 * Base geometry: Lucide `radio-off` (ISC).
 */
const DUR = 0.95

export function RadioOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'radio off'}
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
        <path d="M13.414 13.414a2 2 0 1 1-2.828-2.828" />
        <path d="M16.247 7.761a6 6 0 0 1 1.744 4.572" />
        <path d="M19.075 4.933a10 10 0 0 1 2.234 10.72" />
        <path d="M4.925 19.067a10 10 0 0 1 0-14.134" />
        <path d="M7.753 16.239a6 6 0 0 1 0-8.478" />
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
  name: 'radio-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['disabled', 'off', 'radio'],
}

export default RadioOffIcon
