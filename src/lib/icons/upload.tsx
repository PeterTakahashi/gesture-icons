import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Upload — the arrow takes off. It crouches down a hair — the load before
 * a launch — then leaves straight up and off the frame at speed, is
 * repositioned below while nobody can see it, and arrives back up into
 * rest on an ease-out. The tray recoils on the launch, not the landing —
 * that's the moment it actually feels the push.
 * Base geometry: Lucide `upload` (ISC).
 */
const DUR = 1.05

export function UploadIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'upload'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            // crouch → launch off-frame → reposition below (invisible) → arrive
            y: [0, 1.8, -30, 30, 30, 0],
            transition: {
              duration: DUR,
              times: [0, 0.16, 0.4, 0.4, 0.5, 0.86],
              ease: [easeOutQuart, easeInCubic, 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      >
        <path d="M12 3v12" />
        <path d="m17 8-5-5-5 5" />
      </motion.g>
      {/* the tray takes the recoil the moment the arrow leaves it */}
      <motion.path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 1.2, -0.3, 0],
            transition: {
              duration: DUR,
              times: [0, 0.16, 0.28, 0.44, 0.6],
              ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'upload',
  gesture: 'the arrow takes off',
  family: 'travel' as const,
  section: 'Files & time',
  tags: ['send', 'up', 'put'],
}

export default UploadIcon
