import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Link 2 — VARIANT(link): same snap-together mechanic as `link.tsx`, but
 * this glyph's two hooks sit on a horizontal axis around a shared bar, so
 * the halves part left and right instead of along a diagonal, then snap
 * back with a pass-through overshoot — clicked.
 * Base geometry: Lucide `link-2` (ISC).
 */
const DUR = 1.0

export function Link2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'link 2'}
      {...hoverProps}
    >
      <motion.path
        d="M9 17H7A5 5 0 0 1 7 7h2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -2, -2, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.31, 0.55, 1], ease: [easeInCubic, 'linear', settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M15 7h2a5 5 0 1 1 0 10h-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 2, 2, -0.4, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.31, 0.55, 1], ease: [easeInCubic, 'linear', settleBack, easeOutQuart] },
          },
        }}
      />
      <line x1="8" x2="16" y1="12" y2="12" />
    </svg>
  )
}

export const meta = {
  name: 'link-2',
  gesture: 'the link snaps in',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['url', 'chain', 'connect', 'link'],
}

export default Link2Icon
