import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Switch camera — it turns around. The two chevrons are not symmetric
 * enough to land invisibly on a quarter turn (unlike repeat.tsx's rails),
 * so instead of an off-frame wrap they chase 90° about the lens and come
 * back the way they went — a there-and-back still reads as the pair
 * swapping places once. The lens pops right on the swap.
 * Base geometry: Lucide `switch-camera` (ISC).
 */
const DUR = 1.0

export function SwitchCameraIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const chevron = {
    normal: { rotate: 0 },
    animate: {
      rotate: [0, 95, 90, 0],
      transition: { duration: DUR, times: [0, 0.42, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'switch camera'}
      {...hoverProps}
    >
      <path d="M11 19H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
      <path d="M13 5h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-5" />
      <motion.circle
        cx="12" cy="12" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.25, 1],
            transition: { duration: DUR, times: [0, 0.42, 0.56, 0.72], ease: settleBack },
          },
        }}
      />
      <motion.path
        d="m18 22-3-3 3-3"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={chevron}
      />
      <motion.path
        d="m6 2 3 3-3 3"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={chevron}
      />
    </svg>
  )
}

export const meta = {
  name: 'switch-camera',
  gesture: 'it turns around',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['flip', 'selfie', 'camera', 'switch'],
}

export default SwitchCameraIcon
