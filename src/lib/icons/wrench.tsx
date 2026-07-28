import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Wrench — it tightens a turn. Two small ratchet steps snug the turn home
 * (0 → 18° → 30°, each a quick snap with a held beat), then one smooth
 * turn back — the bolt is snugged, not stripped.
 * Base geometry: Lucide `wrench` (ISC).
 */
const DUR = 1.0

export function WrenchIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wrench'}
      {...hoverProps}
    >
      <motion.path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"
        style={{ transformBox: 'view-box', transformOrigin: '17px 7px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 18, 18, 30, 30, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.38, 0.56, 0.72, 1], ease: [easeOutQuart, 'linear', easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'wrench',
  gesture: 'it tightens a turn',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['fix', 'bolt', 'tool'],
}

export default WrenchIcon
