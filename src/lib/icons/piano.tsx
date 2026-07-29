import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Piano — a phrase is played. Three key-area presses in sequence — left,
 * right, then the middle pair together — each key compressing from its
 * top edge, like a small phrase being picked out. The body never moves.
 * Base geometry: Lucide `piano` (ISC).
 */
const DUR = 0.5

export function PianoIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const press = (delay: number): Variants => ({
    normal: { scaleY: 1 },
    animate: {
      scaleY: [1, 0.82, 1],
      transition: { duration: DUR, delay, times: [0, 0.35, 1], ease: [easeInOutCubic, easeOutQuart] },
    },
  })
  const key = (x: number, delay: number) => (
    <motion.line
      key={x}
      x1={x} x2={x} y1="14" y2="18"
      style={{ transformBox: 'view-box', transformOrigin: `${x}px 14px` }}
      initial="normal"
      animate={controls}
      variants={press(delay)}
    />
  )
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'piano'}
      {...hoverProps}
    >
      <path d="M18.5 8c-1.4 0-2.6-.8-3.2-2A6.87 6.87 0 0 0 2 9v11a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8.5C22 9.6 20.4 8 18.5 8" />
      <path d="M2 14h20" />
      {key(6, 0)}
      {key(18, 0.18)}
      {key(10, 0.36)}
      {key(14, 0.36)}
    </svg>
  )
}

export const meta = {
  name: 'piano',
  gesture: 'a phrase is played',
  family: 'secondary' as const,
  section: 'Media',
  tags: ['music', 'keys', 'instrument', 'piano'],
}

export default PianoIcon
