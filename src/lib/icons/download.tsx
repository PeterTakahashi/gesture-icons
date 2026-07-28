import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Download — the arrow drops into the tray and the tray takes the hit.
 * Wind-up first (a fall with no anticipation reads as teleporting), gravity
 * on the way down, and the tray dips 3% after contact — not one frame before
 * it is touched.
 * Base geometry: Lucide `download` (ISC).
 */
const DUR = 1.0

export function DownloadIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'download'}
      {...hoverProps}
    >
      {/* arrow */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2.8, 4.4, 3.2, 0],
            transition: {
              duration: DUR,
              times: [0, 0.24, 0.48, 0.62, 1],
              ease: [easeOutQuart, gravity, easeOutQuart, easeInOutCubic],
            },
          },
        }}
      >
        <path d="M12 15V3" />
        <path d="m7 10 5 5 5-5" />
      </motion.g>
      {/* tray reacts on the contact frame, never before */}
      <motion.path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 1.6, -0.5, 0],
            transition: {
              duration: DUR,
              times: [0, 0.46, 0.58, 0.76, 1],
              ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}
