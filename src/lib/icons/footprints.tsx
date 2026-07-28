import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack } from '../core/easings'

/**
 * Footprints — the steps continue. Each print presses down and springs
 * back, left then right 150ms apart — a walk-in-place cadence, not a
 * simultaneous stamp.
 * Base geometry: Lucide `footprints` (ISC).
 */
const DUR = 0.8

export function FootprintsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'footprints'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.85, 1],
            transition: { duration: DUR, times: [0, 0.35, 0.7], ease: [easeInCubic, settleBack] },
          },
        }}
      >
        <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
        <path d="M4 13h4" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.85, 1],
            transition: { duration: DUR, delay: 0.15, times: [0, 0.35, 0.7], ease: [easeInCubic, settleBack] },
          },
        }}
      >
        <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
        <path d="M16 17h4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'footprints',
  gesture: 'the steps continue',
  family: 'secondary' as const,
  section: 'People & emotion',
  tags: ['walk', 'path', 'track'],
}

export default FootprintsIcon
