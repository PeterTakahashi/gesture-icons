import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Webcam off — it is switched off. VARIANT: the slash erases then
 * pen-redraws across (like eye-off.tsx) while the lens gives one small
 * defeated tilt about its own center and settles. The stand never moves.
 * Base geometry: Lucide `webcam-off` (ISC).
 */
const DUR = 0.9

export function WebcamOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'webcam off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 1, 1, 0],
            rotate: [0, 2.5, 2.5, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.68, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M12.754 7.096a3 3 0 0 1 2.15 2.15" />
        <path d="M12.863 12.873a3 3 0 0 1-3.736-3.735" />
        <path d="M16.566 16.57A8 8 0 0 1 5.43 5.433" />
        <path d="M8.478 2.817a8 8 0 0 1 10.705 10.705" />
      </motion.g>
      <path d="M12 22v-4" />
      <path d="M7 22h10" />
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.26, 0.42, 0.82], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'webcam-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Devices',
  tags: ['disabled', 'off', 'webcam'],
}

export default WebcamOffIcon
