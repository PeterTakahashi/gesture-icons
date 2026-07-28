import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Cloud hail — VARIANT(cloud-rain): it hails hard. The three pellets fall
 * linearly (no soft gravity curve — hail is fast and mechanical, not a
 * gentle rain arc), leaving through the frame's own bottom edge and
 * re-entering from above the cloud. The cloud jolts down a hair on each
 * release, and the already-fallen dots below each column pulse when the
 * next pellet lands on them.
 * Base geometry: Lucide `cloud-hail` (ISC).
 */
const DUR = 0.9

const STREAKS = [
  { d: 'M16 14v2', dot: 'M16 20h.01', delay: 0 },
  { d: 'M8 14v2', dot: 'M8 20h.01', delay: 0.07 },
  { d: 'M12 16v2', dot: 'M12 22h.01', delay: 0.14 },
]

export function CloudHailIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud hail'}
      {...hoverProps}
    >
      <motion.path
        d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0, 0.6, 0, 0.6, 0, 0],
            transition: { duration: DUR, times: [0, 0.05, 0.12, 0.2, 0.27, 0.35, 0.42, 0.5, 1], ease: 'easeOut' },
          },
        }}
      />
      {STREAKS.map((s) => (
        <motion.path
          key={s.d}
          d={s.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 8, 8, -14, -14, 0],
              transition: { duration: DUR, delay: s.delay, times: [0, 0.24, 0.3, 0.3, 0.38, 1], ease: 'linear' },
            },
          }}
        />
      ))}
      {STREAKS.map((s) => (
        <motion.path
          key={s.dot}
          d={s.dot}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1, 1.4, 1],
              transition: { duration: DUR, delay: s.delay, times: [0, 0.36, 0.42, 0.5], ease: [easeOutQuart, settleBack] },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'cloud-hail',
  gesture: 'it hails hard',
  family: 'travel' as const,
  section: 'Nature',
  tags: ['weather', 'storm', 'ice'],
}

export default CloudHailIcon
