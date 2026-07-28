import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Castle — the banner day. Each battlement uprising (the two corner towers
 * and the two merlon teeth between them) NUDGEs up a hair in a left-to-right
 * wave, 50ms apart — the wall feels alive. The wall top, base and gate never
 * move.
 * Base geometry: Lucide `castle` (ISC).
 */
const DUR = 0.8
const MERLONS = [
  { d: 'M6 3v8', delay: 0 },
  { d: 'M10 5V3', delay: 0.05 },
  { d: 'M14 5V3', delay: 0.1 },
  { d: 'M18 3v8', delay: 0.15 },
]

export function CastleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'castle'}
      {...hoverProps}
    >
      {MERLONS.map((m) => (
        <motion.path
          key={m.d}
          d={m.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 0.3, -0.8, 0],
              transition: { duration: DUR, delay: m.delay, times: [0, 0.2, 0.55, 0.85], ease: [easeInOutCubic, settleBack, easeOutQuart] },
            },
          }}
        />
      ))}
      <path d="M15 21v-3a3 3 0 0 0-6 0v3" />
      <path d="M18 5H6" />
      <path d="M22 11H2" />
      <path d="M22 9v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9" />
    </svg>
  )
}

export const meta = {
  name: 'castle',
  gesture: 'the banner day',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['fortress', 'medieval', 'kingdom'],
}

export default CastleIcon
