import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Shield alert — it raises the alarm. VARIANT(shield): the shield gives its
 * one firm brace first, then the exclamation mark blinks twice — a true
 * binary opacity step, never a fade — reading as the alarm being raised
 * once the shield has already set.
 * Base geometry: Lucide `shield-alert` (ISC).
 */
const DUR = 1.15

export function ShieldAlertIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shield alert'}
      {...hoverProps}
    >
      <motion.path
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.95, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.12, 0.26, 0.38], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      {/* the alert mark: a true binary blink, twice, only after the shield settles */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.4, 0.41, 0.53, 0.54, 0.66, 0.67, 0.79, 0.8, 0.9],
              ease: 'linear',
            },
          },
        }}
      >
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'shield-alert',
  gesture: 'it raises the alarm',
  family: 'secondary' as const,
  section: 'Security',
  tags: ['warning', 'threat'],
}

export default ShieldAlertIcon
