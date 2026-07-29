import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Wifi off — it is switched off. The slash erases then pen-redraws itself,
 * the same beat as eye-off.tsx, while the signal glyph gives one small
 * defeated sag-and-tilt and straightens back up.
 * Base geometry: Lucide `wifi-off` (ISC).
 */
const DUR = 0.95

export function WifiOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wifi off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 2.2, 2.2, 0],
            rotate: [0, 3, 3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.62, 0.92], ease: [easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="M12 20h.01" />
        <path d="M8.5 16.429a5 5 0 0 1 7 0" />
        <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
        <path d="M19 12.859a10 10 0 0 0-2.007-1.523" />
        <path d="M2 8.82a15 15 0 0 1 4.177-2.643" />
        <path d="M22 8.82a15 15 0 0 0-11.288-3.764" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.4, 0.8], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'wifi-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['disabled', 'off', 'wifi'],
}

export default WifiOffIcon
