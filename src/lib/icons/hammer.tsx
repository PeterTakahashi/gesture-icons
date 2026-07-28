import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, gravity, easeOutQuart } from '../core/easings'

/**
 * Hammer — it drives the nail. The whole head swings about the grip end:
 * a small wind-up raises it, gravity takes the downswing, and the glyph
 * takes a hard one-frame jolt on impact — then it settles, spent.
 * Base geometry: Lucide `hammer` (ISC).
 */
const DUR = 0.75

export function HammerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hammer'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '4px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -20, 8, 0],
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.56, 1], ease: [easeInOutCubic, gravity, easeOutQuart] },
          },
        }}
      >
        <path d="m15 12-9.373 9.373a1 1 0 0 1-3.001-3L12 9" />
        <path d="m18 15 4-4" />
        <path d="m21.5 11.5-1.914-1.914A2 2 0 0 1 19 8.172v-.344a2 2 0 0 0-.586-1.414l-1.657-1.657A6 6 0 0 0 12.516 3H9l1.243 1.243A6 6 0 0 1 12 8.485V10l2 2h1.172a2 2 0 0 1 1.414.586L18.5 14.5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'hammer',
  gesture: 'it drives the nail',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['build', 'fix', 'tool'],
}

export default HammerIcon
