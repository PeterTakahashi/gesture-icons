import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Brick wall — it is laid true. The top course settles down onto the row
 * below it — mortar taking the weight — and the joint line beneath it
 * isn't hit until the bricks actually arrive, so it dips 3% later on the
 * same curve, smaller. Everything else in the wall stays put.
 * Base geometry: Lucide `brick-wall` (ISC).
 */
const DUR = 0.9

export function BrickWallIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'brick wall'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path
        d="M16 3v6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: [easeOutQuart, easeInOutCubic, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M8 3v6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: [easeOutQuart, easeInOutCubic, easeInOutCubic] },
          },
        }}
      />
      <path d="M12 9v6" />
      <path d="M16 15v6" />
      <path d="M8 15v6" />
      <path d="M3 15h18" />
      <motion.path
        d="M3 9h18"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0.1, 0],
            transition: { duration: DUR, times: [0, 0.03, 0.42, 0.74, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'brick-wall',
  gesture: 'it is laid true',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['construction', 'wall', 'solid', 'brick'],
}

export default BrickWallIcon
