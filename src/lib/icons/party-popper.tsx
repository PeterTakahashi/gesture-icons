import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic, settleBack, pen } from '../core/easings'

/**
 * Party popper — it pops the confetti. The popper tips about its base, and
 * the confetti — the dot flecks and the streamer curls — burst: each
 * implodes and is redrawn staggered 40ms apart, landing back exactly on
 * Lucide's resting confetti. One pop worth of joy.
 * Base geometry: Lucide `party-popper` (ISC).
 */
const DUR = 0.95
const DOTS = [
  { d: 'M4 3h.01', delay: 0 },
  { d: 'M22 8h.01', delay: 0.04 },
  { d: 'M15 2h.01', delay: 0.08 },
  { d: 'M22 20h.01', delay: 0.12 },
]
const STREAMERS = [
  { d: 'm22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10', delay: 0.16 },
  { d: 'm22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17', delay: 0.2 },
  { d: 'm11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7', delay: 0.24 },
  { d: 'M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z', delay: 0.28 },
]

export function PartyPopperIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const dotPop = (delay: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.001, 1.3, 1],
      transition: { duration: DUR, delay, times: [0, 0.3, 0.55, 0.8], ease: [pen, settleBack, easeOutQuart] },
    },
  })
  const streamerBurst = (delay: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, delay, times: [0, 0.22, 0.4, 0.78], ease: [pen, 'linear', pen] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'party popper'}
      {...hoverProps}
    >
      <motion.path
        d="M5.8 11.3 2 22l10.7-3.79"
        style={{ transformBox: 'view-box', transformOrigin: '2px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 3, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.55, 0.85], ease: easeInOutCubic },
          },
        }}
      />
      {DOTS.map((s) => (
        <motion.path
          key={s.d}
          d={s.d}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={dotPop(s.delay)}
        />
      ))}
      {STREAMERS.map((s) => (
        <motion.path key={s.d} d={s.d} initial="normal" animate={controls} variants={streamerBurst(s.delay)} />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'party-popper',
  gesture: 'it pops the confetti',
  family: 'secondary' as const,
  section: 'Tools',
  tags: ['celebrate', 'confetti', 'party'],
}

export default PartyPopperIcon
