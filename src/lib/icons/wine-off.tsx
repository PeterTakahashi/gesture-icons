import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Wine off — it is switched off. The slash erases then pen-redraws itself,
 * the same beat as eye-off.tsx, while the glass gives one small defeated
 * sag-and-tilt and straightens back up. The slash is Lucide's own `<line>`
 * element here rather than a `<path>` — pathLength drives it exactly the
 * same way.
 * Base geometry: Lucide `wine-off` (ISC).
 */
const DUR = 0.95

export function WineOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wine off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 2.4, 2.4, 0],
            rotate: [0, 3, 3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.62, 0.92], ease: [easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="M8 22h8" />
        <path d="M7 10h3m7 0h-1.343" />
        <path d="M12 15v7" />
        <path d="M7.307 7.307A12.33 12.33 0 0 0 7 10a5 5 0 0 0 7.391 4.391M8.638 2.981C8.75 2.668 8.872 2.34 9 2h6c1.5 4 2 6 2 8 0 .407-.05.809-.145 1.198" />
      </motion.g>
      <motion.line
        x1="2" x2="22" y1="2" y2="22"
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
  name: 'wine-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Food & drink',
  tags: ['disabled', 'off', 'wine'],
}

export default WineOffIcon
