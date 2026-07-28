import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, easeOutQuint } from '../core/easings'

/**
 * Unlock — it springs open. The shackle's free end is already drawn clear
 * of the body (that is what "unlocked" looks like), so the release pops it
 * further up and lets it sway, hinged at the foot still anchored in the
 * body. The body takes a small downward push at the very start — the
 * release that frees the shackle.
 * Base geometry: Lucide `lock-open` (ISC).
 */
const DUR = 0.9

export function UnlockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'unlock'}
      {...hoverProps}
    >
      <motion.path
        d="M7 11V7a5 5 0 0 1 9.9-1"
        style={{ transformBox: 'view-box', transformOrigin: '7px 11px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -1.8, 0.4, 0],
            rotate: [0, -6, 2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.7, 1], ease: [easeOutQuint, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.rect
        width="18" height="11" x="3" y="11" rx="2" ry="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.35], ease: [easeInCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'unlock',
  gesture: 'it springs open',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['unlock', 'open', 'access'],
}

export default UnlockIcon
