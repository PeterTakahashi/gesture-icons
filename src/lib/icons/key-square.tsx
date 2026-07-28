import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart } from '../core/easings'

/**
 * Key square — it turns square. VARIANT(key): same rotating-key pun, hinged
 * about the center of its square bow (the diamond head spans x 8.7–21.3,
 * y 2.7–15.3, so its center sits at 15,9). Wind-up, turn past 90°, hold,
 * return.
 * Base geometry: Lucide `key-square` (ISC).
 */
const DUR = 1.1

export function KeySquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'key square'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '15px 9px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, 90, 90, -5, 0],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.4, 0.58, 0.86, 1],
              ease: [easeInOutCubic, [0.5, 0, 0.3, 1.1], 'linear', easeInOutQuart, easeOutQuart],
            },
          },
        }}
      >
        <path d="M12.4 2.7a2.5 2.5 0 0 1 3.4 0l5.5 5.5a2.5 2.5 0 0 1 0 3.4l-3.7 3.7a2.5 2.5 0 0 1-3.4 0L8.7 9.8a2.5 2.5 0 0 1 0-3.4z" />
        <path d="m14 7 3 3" />
        <path d="m9.4 10.6-6.814 6.814A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'key-square',
  gesture: 'it turns square',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['password', 'access'],
}

export default KeySquareIcon
