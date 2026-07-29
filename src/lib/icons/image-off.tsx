import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic, pen } from '../core/easings'

/**
 * Image off — it is switched off. The slash DRAWs across (erase then
 * pen-redraw, never a fade — same trick as eye-off.tsx and bot-off.tsx)
 * while, in the gap where it's briefly erased, the picture gives ONE small
 * defeated sag/tilt about its own center and settles back before the
 * slash redraws over it.
 * Base geometry: Lucide `image-off` (ISC).
 */
const DUR = 0.95

export function ImageOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'image off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 0, 3, 0],
            y: [0, 0, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 0.95], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M10.41 10.41a2 2 0 1 1-2.83-2.83" />
        <line x1="13.5" x2="6" y1="13.5" y2="21" />
        <line x1="18" x2="21" y1="12" y2="15" />
        <path d="M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59" />
        <path d="M21 15V5a2 2 0 0 0-2-2H9" />
      </motion.g>
      <motion.line
        x1="2" x2="22" y1="2" y2="22"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.4, 0.8], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'image-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Media',
  tags: ['disabled', 'off', 'image'],
}

export default ImageOffIcon
