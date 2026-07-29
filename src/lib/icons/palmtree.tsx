import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Palm tree — it rides the trade wind. The three frond clusters sway
 * together about the trunk top where they all converge, and the trunk
 * itself flexes about its root a beat (~3%) later — the layer below feels
 * the sway after the layer above, not on the same frame.
 * Base geometry: Lucide `palmtree` (ISC).
 */
const DUR = 1.3

export function PalmtreeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'palmtree'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '13px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 4, -2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M13 8c0-2.76-2.46-5-5.5-5S2 5.24 2 8h2l1-1 1 1h4" />
        <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.24 5.5 5h-3l-1-1-1 1h-3" />
        <path d="M5.89 9.71c-2.15 2.15-2.3 5.47-.35 7.43l4.24-4.25.7-.7.71-.71 2.12-2.12c-1.95-1.96-5.27-1.8-7.42.35" />
      </motion.g>
      <motion.path
        d="M11 15.5c.5 2.5-.17 4.5-1 6.5h4c2-5.5-.5-12-1-14"
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2, 1.3, -0.6, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.58, 0.83, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'palmtree',
  gesture: 'it rides the trade wind',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['beach', 'tropical', 'vacation', 'palmtree'],
}

export default PalmtreeIcon
