import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Drum — it keeps the beat. Two hits, lub-dub: the shell takes each dip
 * exactly as the matching stick flicks down about the grip a hand would
 * hold, landing on the same contact frame, never before it. The legs the
 * drum stands on never move.
 * Base geometry: Lucide `drum` (ISC).
 */
const DUR = 0.95

export function DrumIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'drum'}
      {...hoverProps}
    >
      <motion.path
        d="m2 2 8 8"
        style={{ transformBox: 'view-box', transformOrigin: '2px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.46], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="m22 2-8 8"
        style={{ transformBox: 'view-box', transformOrigin: '22px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, -12, 0],
            transition: { duration: DUR, times: [0, 0.58, 0.74, 0.88], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.48, 0.74, 0.9], ease: [gravity, easeOutQuart, gravity, easeOutQuart] },
          },
        }}
      >
        <ellipse cx="12" cy="9" rx="10" ry="5" />
        <path d="M2 9v8a10 5 0 0 0 20 0V9" />
      </motion.g>
      <path d="M7 13.4v7.9" />
      <path d="M12 14v8" />
      <path d="M17 13.4v7.9" />
    </svg>
  )
}

export const meta = {
  name: 'drum',
  gesture: 'it keeps the beat',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['music', 'rhythm', 'percussion', 'drum'],
}

export default DrumIcon
