import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Paint bucket — it tips to pour. The bucket, handle and fill line rotate
 * together about the corner it rests on, hold the tip while the pour reads,
 * then right themselves with a settle. The drip below is already-poured
 * paint, so it stays put — it isn't part of the tipping body.
 * Base geometry: Lucide `paint-bucket` (ISC).
 */
const DUR = 1.1

export function PaintBucketIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'paint bucket'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '5px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, -10, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="M11 7 6 2" />
        <path d="M18.992 12H2.041" />
        <path d="m8.5 4.5 2.148-2.148a1.205 1.205 0 0 1 1.704 0l7.296 7.296a1.205 1.205 0 0 1 0 1.704l-7.592 7.592a3.615 3.615 0 0 1-5.112 0l-3.888-3.888a3.615 3.615 0 0 1 0-5.112L5.67 7.33" />
      </motion.g>
      <path d="M21.145 18.38A3.34 3.34 0 0 1 20 16.5a3.3 3.3 0 0 1-1.145 1.88c-.575.46-.855 1.02-.855 1.595A2 2 0 0 0 20 22a2 2 0 0 0 2-2.025c0-.58-.285-1.13-.855-1.595" />
    </svg>
  )
}

export const meta = {
  name: 'paint-bucket',
  gesture: 'it tips to pour',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['paint', 'fill'],
}

export default PaintBucketIcon
