import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Repeat off — the loop stops. VARIANT: the slash erases then pen-redraws
 * across (like eye-off.tsx) while the whole loop track sags a small
 * defeated tilt about its own center and settles.
 * Base geometry: Lucide `repeat-off` (ISC).
 */
const DUR = 0.9

export function RepeatOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'repeat off'}
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
        <path d="M11.656 6H21l-4-4" />
        <path d="M17.898 17.898A4 4 0 0 1 17 18H3l4-4" />
        <path d="M21 13v1a4 4 0 0 1-.171 1.159" />
        <path d="m21 6-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 3.102-3.898" />
        <path d="m7 22-4-4" />
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
  name: 'repeat-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Arrows',
  tags: ['disabled', 'off', 'repeat'],
}

export default RepeatOffIcon
