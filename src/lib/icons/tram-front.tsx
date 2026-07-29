import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuint, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Tram front — VARIANT(train): it glides to the stop. Departs right at
 * speed, is repositioned to the far side while genuinely off-frame, and
 * pulls IN from the left on a long arrival curve — the readable beat is the
 * arrival, so it gets most of the clock — with a small settle dip as it
 * stops.
 * Base geometry: Lucide `tram-front` (ISC).
 */
const DUR = 1.2

export function TramFrontIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tram front'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 26, -26, 0],
            y: [0, 0, 0.6, 0],
            transition: {
              duration: DUR,
              x: { times: [0, 0.15, 0.16, 1], ease: [easeInCubic, 'linear', easeOutQuint] },
              y: { times: [0, 0.88, 0.94, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
            },
          },
        }}
      >
        <rect width="16" height="16" x="4" y="3" rx="2" />
        <path d="M4 11h16" />
        <path d="M12 3v8" />
        <path d="m8 19-2 3" />
        <path d="m18 22-2-3" />
        <path d="M8 15h.01" />
        <path d="M16 15h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'tram-front',
  gesture: 'it glides to the stop',
  family: 'travel' as const,
  section: 'Transport',
  tags: ['streetcar', 'transit', 'tram', 'front'],
}

export default TramFrontIcon
