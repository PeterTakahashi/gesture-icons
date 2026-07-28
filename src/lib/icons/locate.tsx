import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint } from '../core/easings'

/**
 * Locate — it finds you. The four crosshair ticks nudge inward together with
 * a snappy lock, hold, and ease back to their rest spacing, while the ring
 * breathes once — a position being acquired.
 * Base geometry: Lucide `locate` (ISC).
 */
const DUR = 0.85
const TICK = { times: [0, 0.32, 0.62, 1], ease: [easeOutQuint, 'linear' as const, easeInOutCubic] }

export function LocateIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'locate'}
      {...hoverProps}
    >
      <motion.line
        x1="2" x2="5" y1="12" y2="12"
        initial="normal"
        animate={controls}
        variants={{ normal: { x: 0 }, animate: { x: [0, 1.3, 1.3, 0], transition: { duration: DUR, ...TICK } } }}
      />
      <motion.line
        x1="19" x2="22" y1="12" y2="12"
        initial="normal"
        animate={controls}
        variants={{ normal: { x: 0 }, animate: { x: [0, -1.3, -1.3, 0], transition: { duration: DUR, ...TICK } } }}
      />
      <motion.line
        x1="12" x2="12" y1="2" y2="5"
        initial="normal"
        animate={controls}
        variants={{ normal: { y: 0 }, animate: { y: [0, 1.3, 1.3, 0], transition: { duration: DUR, ...TICK } } }}
      />
      <motion.line
        x1="12" x2="12" y1="19" y2="22"
        initial="normal"
        animate={controls}
        variants={{ normal: { y: 0 }, animate: { y: [0, -1.3, -1.3, 0], transition: { duration: DUR, ...TICK } } }}
      />
      <motion.circle
        cx="12" cy="12" r="7"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: { scale: [1, 1.1, 1], transition: { duration: DUR, times: [0, 0.32, 0.7], ease: [easeOutQuart, easeInOutCubic] } },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'locate',
  gesture: 'it finds you',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['gps', 'position'],
}

export default LocateIcon
