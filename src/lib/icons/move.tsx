import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Move — it tugs every way. The center cross is the fixed frame the drag
 * handles pull against, so its two full-length shafts hold still; the four
 * arrowheads each nudge outward 1.5 along their own axis, in unison, and
 * settle back — the glyph stretching against its own handles, once.
 * Base geometry: Lucide `move` (ISC).
 */
const DUR = 0.8

export function MoveIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const outwardX = (dist: number): Variants => ({
    normal: { x: 0 },
    animate: {
      x: [0, dist, 0],
      transition: { duration: DUR, times: [0, 0.45, 1], ease: [easeOutQuart, settleBack] },
    },
  })
  const outwardY = (dist: number): Variants => ({
    normal: { y: 0 },
    animate: {
      y: [0, dist, 0],
      transition: { duration: DUR, times: [0, 0.45, 1], ease: [easeOutQuart, settleBack] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'move'}
      {...hoverProps}
    >
      <path d="M12 2v20" />
      <motion.path d="m15 19-3 3-3-3" initial="normal" animate={controls} variants={outwardY(1.5)} />
      <motion.path d="m19 9 3 3-3 3" initial="normal" animate={controls} variants={outwardX(1.5)} />
      <path d="M2 12h20" />
      <motion.path d="m5 9-3 3 3 3" initial="normal" animate={controls} variants={outwardX(-1.5)} />
      <motion.path d="m9 5 3-3 3 3" initial="normal" animate={controls} variants={outwardY(-1.5)} />
    </svg>
  )
}

export const meta = {
  name: 'move',
  gesture: 'it tugs every way',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['drag', 'pan'],
}

export default MoveIcon
