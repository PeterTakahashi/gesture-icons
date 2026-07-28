import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack } from '../core/easings'

/**
 * Monitor — it wakes. The body takes a subtle press like a power
 * button, then a cursor line blinks twice inside the screen and goes
 * dark again. The cursor is not part of Lucide's glyph, so it is
 * declared hidden at rest and only ever appears as a hard on/off gate
 * — never a fade.
 * Base geometry: Lucide `monitor` (ISC).
 */
const DUR = 1.0

export function MonitorIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'monitor'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.97, 1.02, 1],
            transition: { duration: DUR, times: [0, 0.12, 0.24, 0.4], ease: [easeInCubic, settleBack, 'linear'] },
          },
        }}
      >
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </motion.g>
      <motion.path
        d="M9 10h6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 0 },
          animate: {
            opacity: [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
            transition: {
              duration: DUR,
              times: [0, 0.3, 0.31, 0.45, 0.46, 0.6, 0.61, 0.75, 0.76, 1],
              ease: 'linear',
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'monitor',
  gesture: 'it wakes',
  family: 'secondary' as const,
  section: 'Devices',
  tags: ['screen', 'display', 'desktop'],
}

export default MonitorIcon
