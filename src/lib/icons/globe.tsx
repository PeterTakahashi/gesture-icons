import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Globe — VARIANT(earth): the meridian and equator lines nudge together a
 * few degrees of longitude and settle back; the rim never moves — a planet
 * turning under a fixed horizon line, not a wheel.
 * Base geometry: Lucide `globe` (ISC).
 */
const DUR = 1.1

export function GlobeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'globe'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.4, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'globe',
  gesture: 'the world turns a little',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['world', 'international', 'web', 'globe'],
}

export default GlobeIcon
