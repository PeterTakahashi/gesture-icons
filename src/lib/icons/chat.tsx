import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Chat — someone is typing. Three dots pop in left to right (scale, never
 * opacity), hold while the "typing" reads, and collapse away so the bubble
 * rests exactly as Lucide drew it. The bubble takes a breath as they arrive.
 * Base geometry: Lucide `message-circle` (ISC).
 */
const DUR = 1.1
const DOTS = [8, 12, 16]

export function ChatIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chat'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.04, 1, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 1], ease: easeOutQuart },
          },
        }}
      >
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
      </motion.g>
      {/* typing dots: rest state is the untouched bubble, so they end gone */}
      {DOTS.map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx} cy={12} r={1.15}
          fill={color === 'currentColor' ? 'currentColor' : color}
          stroke="none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 0 },
            animate: {
              scale: [0, 1.3, 1, 1, 0],
              transition: {
                duration: DUR,
                delay: i * 0.09,
                times: [0, 0.14, 0.24, 0.6, 0.74],
                ease: [settleBack, easeOutQuart, 'linear', easeOutQuart],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'chat',
  gesture: 'someone is typing',
  family: 'secondary' as const,
  section: 'Communication',
  tags: ['message', 'bubble', 'typing', 'talk'],
}

export default ChatIcon
