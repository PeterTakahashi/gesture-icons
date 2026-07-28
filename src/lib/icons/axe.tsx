import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, gravity, easeOutQuart } from '../core/easings'

/**
 * Axe — it splits the log. The whole head swings about the handle's grip
 * end: a small wind-up, gravity down, a hard stop with a one-frame jolt on
 * impact — one chop, spent.
 * Base geometry: Lucide `axe` (ISC).
 */
const DUR = 0.75

export function AxeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'axe'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '2px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -16, 6, 0],
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.56, 1], ease: [easeInOutCubic, gravity, easeOutQuart] },
          },
        }}
      >
        <path d="m14 12-8.381 8.38a1 1 0 0 1-3.001-3L11 9" />
        <path d="M15 15.5a.5.5 0 0 0 .5.5A6.5 6.5 0 0 0 22 9.5a.5.5 0 0 0-.5-.5h-1.672a2 2 0 0 1-1.414-.586l-5.062-5.062a1.205 1.205 0 0 0-1.704 0L9.352 5.648a1.205 1.205 0 0 0 0 1.704l5.062 5.062A2 2 0 0 1 15 13.828z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'axe',
  gesture: 'it splits the log',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['chop', 'wood', 'tool'],
}

export default AxeIcon
