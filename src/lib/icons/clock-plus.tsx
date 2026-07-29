import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Clock plus — one more is added. The plus dips to almost nothing and pops
 * back past its own size before settling, and the clock body takes a small
 * y dip exactly on that pop frame. Everything else on the glyph holds
 * still.
 * Base geometry: Lucide `clock-plus` (ISC).
 */
const DUR = 1.0

export function ClockPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clock plus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.55, 0.62], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M12 6v6l3.644 1.822" />
        <path d="M21.92 13.267a10 10 0 1 0-8.653 8.653" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.6, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'clock-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['add', 'new', 'clock', 'plus'],
}

export default ClockPlusIcon
