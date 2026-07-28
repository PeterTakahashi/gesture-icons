import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart } from '../core/easings'

/**
 * Key — it turns in the lock. "Rotating a key" is what you do with an API
 * key, so the gesture is the pun a developer reads without being told.
 * A small counter-grip wind-up, the turn past 90° as the lock gives,
 * a held beat while it is open, then the turn back home.
 * Base geometry: Lucide `key` (ISC).
 */
export function KeyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'key'}
      {...hoverProps}
    >
      {/* 鍵は持ち手（bow）の中心で回る */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '7.5px 15.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, 96, 96, -5, 0],
            transition: {
              duration: 1.1,
              times: [0, 0.14, 0.4, 0.58, 0.86, 1],
              ease: [easeInOutCubic, [0.5, 0, 0.3, 1.1], 'linear', easeInOutQuart, easeOutQuart],
            },
          },
        }}
      >
        <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4" />
        <path d="m21 2-9.6 9.6" />
        <circle cx="7.5" cy="15.5" r="5.5" />
      </motion.g>
    </svg>
  )
}
