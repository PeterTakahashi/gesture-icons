import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Webcam — it looks at you. The inner lens nudges left then right, scanning
 * the room, before the whole head presses in a hair to rack focus on you.
 * The stand beneath never moves.
 * Base geometry: Lucide `webcam` (ISC).
 */
const DUR = 1.0

export function WebcamIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'webcam'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.58, 0.78, 1], ease: ['linear', settleBack, easeOutQuart] },
          },
        }}
      >
        <circle cx="12" cy="10" r="8" />
        <motion.circle
          cx="12" cy="10" r="3"
          initial="normal"
          animate={controls}
          variants={{
            normal: { x: 0 },
            animate: {
              x: [0, -1, 1, 0],
              transition: { duration: DUR, times: [0, 0.16, 0.4, 0.56], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
      <path d="M7 22h10" />
      <path d="M12 22v-4" />
    </svg>
  )
}

export const meta = {
  name: 'webcam',
  gesture: 'it looks at you',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['camera', 'meeting'],
}

export default WebcamIcon
