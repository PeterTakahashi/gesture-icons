import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, easeOutQuint, settleBack } from '../core/easings'

/**
 * Locate fixed — the fix is locked. VARIANT(locate): the same tick lock-in,
 * but this time the center dot itself pops — a fix acquired, not just a
 * position being searched for. The outer ring holds still.
 * Base geometry: Lucide `locate-fixed` (ISC).
 */
const DUR = 0.9
const TICK = { times: [0, 0.32, 0.62, 1], ease: [easeOutQuint, 'linear' as const, easeInOutCubic] }

export function LocateFixedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'locate fixed'}
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
      <circle cx="12" cy="12" r="7" />
      <motion.circle
        cx="12" cy="12" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.4, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.55, 0.78], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'locate-fixed',
  gesture: 'the fix is locked',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['gps', 'position', 'lock'],
}

export default LocateFixedIcon
