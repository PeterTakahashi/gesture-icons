import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint } from '../core/easings'

/**
 * Crosshair — it locks on. The four tick marks nudge inward together with a
 * hard, snappy stop — a lock, not a bounce — hold acquired, then ease back
 * out to their rest spacing. The ring stays put; the ticks do the work.
 * Base geometry: Lucide `crosshair` (ISC).
 */
const DUR = 0.8

export function CrosshairIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const tickX = (dist: number): Variants => ({
    normal: { x: 0 },
    animate: {
      x: [0, dist, dist, 0],
      transition: { duration: DUR, times: [0, 0.32, 0.62, 1], ease: [easeOutQuint, 'linear', easeInOutCubic] },
    },
  })
  const tickY = (dist: number): Variants => ({
    normal: { y: 0 },
    animate: {
      y: [0, dist, dist, 0],
      transition: { duration: DUR, times: [0, 0.32, 0.62, 1], ease: [easeOutQuint, 'linear', easeInOutCubic] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'crosshair'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.line x1="22" x2="18" y1="12" y2="12" initial="normal" animate={controls} variants={tickX(-1.2)} />
      <motion.line x1="6" x2="2" y1="12" y2="12" initial="normal" animate={controls} variants={tickX(1.2)} />
      <motion.line x1="12" x2="12" y1="6" y2="2" initial="normal" animate={controls} variants={tickY(1.2)} />
      <motion.line x1="12" x2="12" y1="22" y2="18" initial="normal" animate={controls} variants={tickY(-1.2)} />
    </svg>
  )
}

export const meta = {
  name: 'crosshair',
  gesture: 'it locks on',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['aim', 'focus', 'precision'],
}

export default CrosshairIcon
