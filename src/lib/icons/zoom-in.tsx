import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Zoom in — it magnifies. The whole lens leans toward the viewer about its
 * own center; a beat later the plus inside pops, since that is the part
 * that is actually "zooming."
 * Base geometry: Lucide `zoom-in` (ISC).
 */
const DUR = 0.85

export function ZoomInIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'zoom in'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 11px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.14, 1],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInCubic, easeOutQuart] },
          },
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 11px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.7, 1.25, 1],
            transition: {
              duration: DUR,
              delay: 0.1,
              times: [0, 0.16, 0.5, 1],
              ease: [easeInCubic, settleBack, easeOutQuart],
            },
          },
        }}
      >
        <line x1="11" x2="11" y1="8" y2="14" />
        <line x1="8" x2="14" y1="11" y2="11" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'zoom-in',
  gesture: 'it magnifies',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['zoom', 'magnify', 'enlarge'],
}

export default ZoomInIcon
