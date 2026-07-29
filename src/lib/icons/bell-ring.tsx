import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Bell ring — it rings, reduced. Same swing-about-the-loop as bell.tsx, the
 * clapper lagging behind, but at about 60% amplitude (±8 instead of ±13)
 * since this glyph already draws the sound in its resting picture. The two
 * sound-wave marks flanking the dome perform their own verb: each stretches
 * outward from the end nearest the bell, the ring actually reaching out,
 * timed to the bell's first swing.
 * Base geometry: Lucide `bell-ring` (ISC).
 */
const DUR = 1.05

export function BellRingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bell ring'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 7, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.54, 0.7, 0.86], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        <motion.path
          d="M10.268 21a2 2 0 0 0 3.464 0"
          style={{ transformBox: 'view-box', transformOrigin: '12px 17.5px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, 6, -5, 4, -2, 1, 0],
              transition: { duration: DUR, times: [0, 0.2, 0.4, 0.58, 0.74, 0.88, 1], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
      <motion.path
        d="M22 8c0-2.3-.8-4.3-2-6"
        style={{ transformBox: 'view-box', transformOrigin: '22px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.28, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.7], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M4 2C2.8 3.7 2 5.7 2 8"
        style={{ transformBox: 'view-box', transformOrigin: '2px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.28, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.7], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bell-ring',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['notification', 'bell', 'ring'],
}

export default BellRingIcon
