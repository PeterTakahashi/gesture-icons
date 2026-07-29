import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Wallpaper — the scene refreshes. The sun and hills inside the frame play
 * image.tsx's sunrise beat first (the sun lifts and settles, the hills hold
 * still); once that settles, the dock's stand and base — always visible,
 * never hidden — give a quick STAMP-like pulse in sequence, the desktop
 * picking itself back up.
 * Base geometry: Lucide `wallpaper` (ISC).
 */
const DUR = 1.3

export function WallpaperIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wallpaper'}
      {...hoverProps}
    >
      <motion.path
        d="M12 17v4"
        style={{ transformBox: 'view-box', transformOrigin: '12px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.3, 1, 1],
            transition: { duration: DUR, times: [0, 0.75, 0.83, 0.9, 1], ease: ['linear', 'linear', settleBack, easeOutQuart] },
          },
        }}
      />
      <path d="m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15" />
      <motion.circle
        cx="8" cy="9" r="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.8, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.29, 0.53, 0.73], ease: [easeOutQuart, easeInOutCubic, easeInOutCubic] },
          },
        }}
      />
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <motion.path
        d="M8 21h8"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.85, 0.88, 0.95, 1], ease: ['linear', 'linear', settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'wallpaper',
  gesture: 'the scene refreshes',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['background', 'desktop', 'wallpaper'],
}

export default WallpaperIcon
