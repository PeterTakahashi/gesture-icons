import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Gift — the lid pops. It springs up off the box with a little overshoot,
 * hovers for the reveal, then drops back — the box takes the thump when
 * the lid lands, the way a table takes an impact.
 * Base geometry: Lucide `gift` (ISC).
 */
const DUR = 1.1

export function GiftIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gift'}
      {...hoverProps}
    >
      {/* lid + bow pop off the box */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 9px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -3, -3, 0],
            rotate: [0, -5, -5, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.72, 0.94], ease: [settleBack, 'linear', easeInCubic] },
          },
        }}
      >
        <rect x="3" y="7" width="18" height="4" rx="1" />
        <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
      </motion.g>
      {/* box takes the thump when the lid lands */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.9, 0],
            transition: { duration: DUR, times: [0, 0.94, 0.97, 1], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M12 7v14" />
        <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'gift',
  gesture: 'the lid pops',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['present', 'surprise', 'reward', 'birthday'],
}

export default GiftIcon
