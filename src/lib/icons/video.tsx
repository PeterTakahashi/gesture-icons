import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Video — it starts rolling. The viewfinder flap tilts up about its mount
 * on the camera body — framing the shot — holds a beat, and levels back;
 * then the whole camera takes a small press, like a record button giving
 * way underfoot.
 * Base geometry: Lucide `video` (ISC).
 */
const DUR = 1.0

export function VideoIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'video'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.94, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.78, 0.86, 0.94, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <rect x="2" y="6" width="14" height="12" rx="2" />
        {/* flap hinges where it meets the body's right edge */}
        <motion.path
          d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"
          style={{ transformBox: 'view-box', transformOrigin: '16px 11.75px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -4, -4, 0],
              transition: { duration: DUR, times: [0, 0.3, 0.62, 0.8], ease: [easeInOutCubic, 'linear', easeOutQuart] },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'video',
  gesture: 'it starts rolling',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['camera', 'record', 'film'],
}

export default VideoIcon
