import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Stretch horizontal — each bar stretches. Both ends extend outward from
 * center by 1.5 units and spring back — the bars are tried at full width
 * before settling to rest.
 * Base geometry: Lucide `stretch-horizontal` (ISC).
 */
const DUR = 0.8

export function StretchHorizontalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'stretch horizontal'}
      {...hoverProps}
    >
      <motion.rect
        width="20" height="6" x="2" y="4" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 7px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleX: 1 },
          animate: {
            scaleX: [1, 1.15, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeInOutCubic, settleBack] },
          },
        }}
      />
      <motion.rect
        width="20" height="6" x="2" y="14" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleX: 1 },
          animate: {
            scaleX: [1, 1.15, 1],
            transition: { duration: DUR, delay: 0.05, times: [0, 0.5, 1], ease: [easeInOutCubic, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'stretch-horizontal',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['layout', 'arrange', 'stretch', 'horizontal'],
}

export default StretchHorizontalIcon
