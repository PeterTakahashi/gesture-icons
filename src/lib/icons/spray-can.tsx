import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Spray can — it tags a burst. The can tips about its base and the nozzle
 * cap takes the press; three mist dots — rest-hidden, no such marks exist
 * on the static glyph — pop out in a fan on the press and collapse away.
 * One hiss. The body and texture marks hold still.
 * Base geometry: Lucide `spray-can` (ISC).
 */
const DUR = 0.85
const MIST = [
  { cx: 14, cy: 2.5, delay: 0 },
  { cx: 17.5, cy: 2, delay: 0.04 },
  { cx: 20.5, cy: 3, delay: 0.08 },
]

export function SprayCanIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'spray can'}
      {...hoverProps}
    >
      <path d="M3 3h.01" />
      <path d="M7 5h.01" />
      <path d="M11 7h.01" />
      <path d="M3 7h.01" />
      <path d="M7 9h.01" />
      <path d="M3 11h.01" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 0],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: easeInCubic },
          },
        }}
      >
        <motion.rect
          width="4" height="4" x="15" y="5"
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 5 },
            animate: {
              y: [5, 5.5, 5],
              transition: { duration: DUR, times: [0, 0.4, 0.7], ease: easeInCubic },
            },
          }}
        />
        <path d="m19 9 2 2v10c0 .6-.4 1-1 1h-6c-.6 0-1-.4-1-1V11l2-2" />
        <path d="m13 14 8-2" />
        <path d="m13 19 8-2" />
      </motion.g>
      {MIST.map((m) => (
        <motion.circle
          key={m.cx}
          cx={m.cx} cy={m.cy} r={0.9}
          fill={color === 'currentColor' ? 'currentColor' : color}
          stroke="none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 0.001 },
            animate: {
              scale: [0.001, 1.3, 1, 0.001],
              transition: {
                duration: DUR,
                delay: m.delay,
                times: [0, 0.44, 0.6, 0.9],
                ease: [settleBack, easeOutQuart, easeOutQuart],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'spray-can',
  gesture: 'it tags a burst',
  family: 'secondary' as const,
  section: 'Tools',
  tags: ['paint', 'graffiti', 'aerosol', 'spray', 'can'],
}

export default SprayCanIcon
