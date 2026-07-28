import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Bookmark — the ribbon dips. Hung from the top edge, it drops into the
 * page under its own weight and rebounds a hair before settling, the notch
 * flexing wider for a beat as it takes the motion — marked.
 * Base geometry: Lucide `bookmark` (ISC).
 */
const DUR = 0.85

export function BookmarkIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bookmark'}
      {...hoverProps}
    >
      <motion.path
        d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, scaleY: 1 },
          animate: {
            y: [0, 1.6, -0.4, 0],
            scaleY: [1, 1, 1.06, 1],
            transition: {
              duration: DUR,
              y: { times: [0, 0.36, 0.68, 1], ease: [gravity, easeOutQuart, easeInOutCubic] },
              scaleY: { times: [0, 0.4, 0.62, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bookmark',
  gesture: 'the ribbon dips',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['save', 'later', 'favorite'],
}

export default BookmarkIcon
