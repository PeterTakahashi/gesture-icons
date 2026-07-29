import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic, pen } from '../core/easings'

/**
 * Mouse off — it is switched off. The slash DRAWs across (erase then
 * pen-redraw, never a fade — same trick as eye-off.tsx and bot-off.tsx)
 * while, in the gap where it's briefly erased, the mouse gives ONE small
 * defeated sag/tilt about its own center and settles back before the
 * slash redraws over it.
 * Base geometry: Lucide `mouse-off` (ISC).
 */
const DUR = 0.9

export function MouseOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mouse off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 0, 3, 0],
            y: [0, 0, 1.3, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 0.95], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 6v.343" />
        <path d="M18.218 18.218A7 7 0 0 1 5 15V9a7 7 0 0 1 .782-3.218" />
        <path d="M19 13.343V9A7 7 0 0 0 8.56 2.902" />
      </motion.g>
      <motion.path
        d="M22 22 2 2"
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
  name: 'mouse-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Media',
  tags: ['disabled', 'off', 'mouse'],
}

export default MouseOffIcon
