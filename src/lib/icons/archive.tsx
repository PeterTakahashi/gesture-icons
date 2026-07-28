import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Archive — the lid shuts. Hinged at its left end where it meets the box,
 * the lid lifts and tips back, holds a beat so the open box reads, then
 * drops shut on an accelerating fall; the box takes the thump the frame
 * after the lid actually lands — cause, then effect.
 * Base geometry: Lucide `archive` (ISC).
 */
const DUR = 1.0

export function ArchiveIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'archive'}
      {...hoverProps}
    >
      {/* lid, hinged at its left end where it meets the box */}
      <motion.rect
        width="20" height="5" x="2" y="3" rx="1"
        style={{ transformBox: 'view-box', transformOrigin: '2px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -2.4, -2.4, 0],
            rotate: [0, -4, -4, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 0.86], ease: [easeOutQuart, 'linear', easeInCubic] },
          },
        }}
      />
      {/* the box takes the thump on the landing frame */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0, 0.9, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.86, 0.93, 1], ease: ['linear', 'linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
        <path d="M10 12h4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'archive',
  gesture: 'the lid shuts',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['box', 'store', 'old'],
}

export default ArchiveIcon
