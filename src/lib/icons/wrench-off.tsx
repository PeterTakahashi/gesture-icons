import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Wrench off — it is switched off. VARIANT: the slash erases then
 * pen-redraws across (like eye-off.tsx) while the wrench gives one small
 * defeated tilt about its own center and settles.
 * Base geometry: Lucide `wrench-off` (ISC).
 */
const DUR = 0.9

export function WrenchOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wrench off'}
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
        <path d="M10.747 5.093a6 6 0 0 1 6.841-2.882c.438.12.54.662.219.984L14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-2.882 6.842" />
        <path d="m13.5 13.5-7.88 7.88a1 1 0 0 1-2.999-3l7.88-7.88" />
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
  name: 'wrench-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Tools',
  tags: ['disabled', 'off', 'wrench'],
}

export default WrenchOffIcon
