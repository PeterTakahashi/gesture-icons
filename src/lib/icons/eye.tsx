import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Eye — it blinks. The whole eye scales flat on its own horizontal axis
 * about its center — a lid dropping — then springs back open, dips a hair
 * short of full open, and settles exactly on Lucide's open eye.
 * Base geometry: Lucide `eye` (ISC).
 */
const DUR = 0.75

export function EyeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'eye'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 0.08, 1, 0.96, 1],
            transition: {
              duration: DUR,
              times: [0, 0.18, 0.42, 0.6, 1],
              ease: [easeInCubic, easeOutQuart, easeInOutCubic, easeOutQuart],
            },
          },
        }}
      >
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'eye',
  gesture: 'it blinks',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['view', 'see', 'watch', 'visibility'],
}

export default EyeIcon
