import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Bomb — the fuse burns. The spark at the fuse tip flickers fast, and the
 * body shakes and swells a hair with the tension — then it rests intact,
 * no explosion, just the held breath before one.
 * Base geometry: Lucide `bomb` (ISC).
 */
const DUR = 0.9

export function BombIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bomb'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scale: 1 },
          animate: {
            rotate: [0, -1.2, 1.2, -0.8, 0.6, 0],
            scale: [1, 1.02, 1.01, 1.03, 1.01, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.34, 0.52, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="11" cy="13" r="9" />
        <path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95" />
      </motion.g>
      <motion.path
        d="m22 2-1.5 1.5"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.4, 0.8, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.44, 0.66, 0.9], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bomb',
  gesture: 'the fuse burns',
  family: 'secondary' as const,
  section: 'Tools',
  tags: ['explosive', 'danger', 'boom'],
}

export default BombIcon
