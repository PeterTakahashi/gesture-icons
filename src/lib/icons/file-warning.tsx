import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * File warning — the doc needs attention. The exclamation mark blinks twice,
 * a true binary opacity step with no fade, then holds; the page dips a hair
 * exactly on the first blink, as if the alert had a little weight to it.
 * Base geometry: Lucide `file-warning` (ISC).
 */
const DUR = 1.0

export function FileWarningIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file warning'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.4, -0.1, 0],
            transition: { duration: DUR, times: [0, 0.12, 0.22, 0.34, 0.5], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      </motion.g>
      {/* the alert mark: a true binary blink, twice */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.13, 0.25, 0.26, 0.38, 0.39, 0.51, 0.52, 0.62],
              ease: 'linear',
            },
          },
        }}
      >
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-warning',
  gesture: 'the doc needs attention',
  family: 'secondary' as const,
  section: 'Files & time',
  tags: ['document', 'alert', 'error'],
}

export default FileWarningIcon
