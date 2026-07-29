import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Stretch vertical — each bar stretches. Both ends extend outward from
 * center by 1.5 units and spring back — the bars are tried at full height
 * before settling to rest.
 * Base geometry: Lucide `stretch-vertical` (ISC).
 */
const DUR = 0.8

export function StretchVerticalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'stretch vertical'}
      {...hoverProps}
    >
      <motion.rect
        width="6" height="20" x="4" y="2" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '7px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.15, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeInOutCubic, settleBack] },
          },
        }}
      />
      <motion.rect
        width="6" height="20" x="14" y="2" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '17px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.15, 1],
            transition: { duration: DUR, delay: 0.05, times: [0, 0.5, 1], ease: [easeInOutCubic, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'stretch-vertical',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['layout', 'arrange', 'stretch', 'vertical'],
}

export default StretchVerticalIcon
