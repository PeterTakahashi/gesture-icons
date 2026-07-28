import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Video off — the camera sleeps. The slash DRAWs across (erase then
 * pen-redraw, never a fade) while the camera body droops on its hinge, a
 * small give at the corner it hangs from — off air.
 * Base geometry: Lucide `video-off` (ISC).
 */
const DUR = 0.95

export function VideoOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'video off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '4px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 3, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196" />
        <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'video-off',
  gesture: 'the camera sleeps',
  family: 'draw-on' as const,
  section: 'Media',
  tags: ['mute', 'privacy'],
}

export default VideoOffIcon
