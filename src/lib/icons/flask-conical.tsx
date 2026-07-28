import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Flask conical — the mix bubbles. The flask itself SHAKEs once, fast, up
 * front — the jolt that starts the reaction. Then two tiny bubbles, rest-
 * hidden at scale 0.001 (they aren't part of Lucide's glyph), pop up inside
 * the bowl staggered a beat apart and collapse back down: reaction underway.
 * Base geometry: Lucide `flask-conical` (ISC).
 */
const DUR = 1.0

export function FlaskConicalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const bubble = (start: number): Variants => ({
    normal: { scale: 0.001 },
    animate: {
      scale: [0.001, 0.001, 1.3, 1, 1, 0.001],
      transition: {
        duration: DUR,
        times: [0, start, start + 0.12, start + 0.22, start + 0.4, start + 0.52],
        ease: ['linear', settleBack, easeOutQuart, 'linear', easeInCubic],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'flask conical'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, rotate: 0 },
          animate: {
            x: [0, -1.5, 1.5, -0.8, 0],
            rotate: [0, -1, 1, -0.5, 0],
            transition: { duration: DUR, times: [0, 0.08, 0.18, 0.28, 0.38], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
        <path d="M6.453 15h11.094" />
        <path d="M8.5 2h7" />
      </motion.g>
      <motion.circle
        cx="10.5" cy="18" r="0.9"
        fill={color}
        stroke="none"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={bubble(0.4)}
      />
      <motion.circle
        cx="13" cy="16.5" r="0.7"
        fill={color}
        stroke="none"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={bubble(0.48)}
      />
    </svg>
  )
}

export const meta = {
  name: 'flask-conical',
  gesture: 'the mix bubbles',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['lab', 'chemistry', 'experiment'],
}

export default FlaskConicalIcon
