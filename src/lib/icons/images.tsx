import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Images — the stack fans. The front photo corner (foreground, bottom-left)
 * nudges 1.5 further toward the viewer along the stack's diagonal; the back
 * frame with its mountain and sun counter-nudges 0.8 away — then both
 * settle back to exactly the picture Lucide drew.
 * Base geometry: Lucide `images` (ISC).
 */
const DUR = 0.95
const D = 0.7071

export function ImagesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'images'}
      {...hoverProps}
    >
      {/* back frame (top-right), with its mountain + sun, counter-nudges away */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.8 * D, 0],
            y: [0, -0.8 * D, 0],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <rect x="8" y="2" width="14" height="14" rx="2" />
        <path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" />
        <circle cx="13" cy="7" r="1" fill="currentColor" />
      </motion.g>
      {/* front photo corner (bottom-left), in the foreground, nudges toward viewer */}
      <motion.path
        d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1.5 * D, 0],
            y: [0, 1.5 * D, 0],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'images',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['collection', 'stack', 'images'],
}

export default ImagesIcon
