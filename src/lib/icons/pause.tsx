import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Pause — it holds its breath. The two bars squeeze toward each other and
 * hold the squeeze for a beat — the stillness the icon names — then
 * release back to their resting gap.
 * Base geometry: Lucide `pause` (ISC).
 */
const DUR = 0.85

export function PauseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const bar = (dir: 1 | -1): Variants => ({
    normal: { x: 0, scaleY: 1 },
    animate: {
      x: [0, 1.2 * dir, 1.2 * dir, 0],
      scaleY: [1, 0.94, 0.94, 1],
      transition: { duration: DUR, times: [0, 0.3, 0.6, 1], ease: [easeInOutCubic, 'linear', easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pause'}
      {...hoverProps}
    >
      <motion.rect
        x="14" y="3" width="5" height="18" rx="1"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={bar(-1)}
      />
      <motion.rect
        x="5" y="3" width="5" height="18" rx="1"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={bar(1)}
      />
    </svg>
  )
}

export const meta = {
  name: 'pause',
  gesture: 'it holds its breath',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['media', 'stop', 'wait', 'hold'],
}

export default PauseIcon
