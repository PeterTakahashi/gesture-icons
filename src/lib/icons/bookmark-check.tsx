import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart, gravity, pen } from '../core/easings'

/**
 * Bookmark check — saved for sure. The ribbon dips as it does in
 * `bookmark`, and the tick un-draws and pen-redraws itself, landing right
 * as the ribbon settles — the checkmark is the confirmation, timed to the
 * dip's last beat.
 * Base geometry: Lucide `bookmark-check` (ISC).
 */
const DUR = 1.0

export function BookmarkCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bookmark check'}
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
              y: { times: [0, 0.3, 0.58, 0.86], ease: [gravity, easeOutQuart, easeInOutCubic] },
              scaleY: { times: [0, 0.34, 0.52, 0.86], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
            },
          },
        }}
      />
      <motion.path
        d="m9 10 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.15, 0.32, 0.82], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bookmark-check',
  gesture: 'saved for sure',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['save', 'done'],
}

export default BookmarkCheckIcon
