import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Sidebar — it slides out. There is no separate panel shape in this glyph,
 * only the frame and the divider between panel and content, so the honest
 * move is the divider itself: it nudges left — the panel peeking toward
 * closed — then springs back. The frame never moves.
 * Base geometry: Lucide `sidebar` (ISC).
 */
const DUR = 0.7

export function SidebarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sidebar'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path
        d="M9 3v18"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1.5, 0.3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'sidebar',
  gesture: 'it slides out',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['panel', 'layout', 'nav', 'sidebar'],
}

export default SidebarIcon
