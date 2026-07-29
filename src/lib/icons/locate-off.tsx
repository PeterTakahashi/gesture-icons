import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Locate off — it gives up the search. VARIANT: the slash erases then
 * pen-redraws across (like eye-off.tsx) while the crosshair sags a small
 * defeated tilt about its own center and settles.
 * Base geometry: Lucide `locate-off` (ISC).
 */
const DUR = 0.9

export function LocateOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'locate off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
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
        <path d="M12 19v3" />
        <path d="M12 2v3" />
        <path d="M18.89 13.24a7 7 0 0 0-8.13-8.13" />
        <path d="M19 12h3" />
        <path d="M2 12h3" />
        <path d="M7.05 7.05a7 7 0 0 0 9.9 9.9" />
      </motion.g>
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
  name: 'locate-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Transport',
  tags: ['disabled', 'off', 'locate'],
}

export default LocateOffIcon
