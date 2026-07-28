import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * Bookmark plus — VARIANT(bookmark): the page is saved. The ribbon dips
 * exactly as in `bookmark`, and once it settles the plus mark — a permanent
 * part of this glyph, never hidden — pops with a quick emphasis bounce
 * about its own centre, rather than appearing from nothing.
 * Base geometry: Lucide `bookmark-plus` (ISC).
 */
const DUR = 0.9

export function BookmarkPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bookmark plus'}
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
              y: { times: [0, 0.34, 0.64, 0.95], ease: [gravity, easeOutQuart, easeInOutCubic] },
              scaleY: { times: [0, 0.38, 0.58, 0.95], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
            },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.58, 0.78, 1], ease: ['linear', settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 7v6" />
        <path d="M15 10H9" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'bookmark-plus',
  gesture: 'the page is saved',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['save', 'add', 'later'],
}

export default BookmarkPlusIcon
