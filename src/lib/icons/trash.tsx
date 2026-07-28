import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Trash — the lid opens. Hinged at its right end, it lifts and tips back,
 * holds a beat so the open can reads, then falls shut — the close
 * accelerates (a dropped lid does), and the can thumps when it lands.
 * Base geometry: Lucide `trash-2` (ISC).
 */
const DUR = 1.05

export function TrashIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'trash'}
      {...hoverProps}
    >
      {/* lid + handle, hinged at the right end of the rim */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '20px 6px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -26, -26, 0],
            y: [0, -1, -1, 0],
            transition: {
              duration: DUR,
              times: [0, 0.28, 0.6, 0.82],
              ease: [easeOutQuart, 'linear', easeInCubic],
            },
          },
        }}
      >
        <path d="M3 6h18" />
        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </motion.g>
      {/* the can takes the slam */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.9, 0],
            transition: { duration: DUR, times: [0, 0.82, 0.9, 1], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </motion.g>
    </svg>
  )
}
