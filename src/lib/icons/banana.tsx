import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Banana — it is peeled a little. The whole banana turns about its stem
 * tip, near the top, and rights itself — offered by the stem.
 * Base geometry: Lucide `banana` (ISC).
 */
const DUR = 0.85

export function BananaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'banana'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '13px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 3, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: [easeInOutCubic, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M4 13c3.5-2 8-2 10 2a5.5 5.5 0 0 1 8 5" />
        <path d="M5.15 17.89c5.52-1.52 8.65-6.89 7-12C11.55 4 11.5 2 13 2c3.22 0 5 5.5 5 8 0 6.5-4.2 12-10.49 12C5.11 22 2 22 2 20c0-1.5 1.14-1.55 3.15-2.11Z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'banana',
  gesture: 'it is peeled a little',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['fruit'],
}

export default BananaIcon
