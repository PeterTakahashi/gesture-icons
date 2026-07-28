import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Baby — it giggles. Two tiny bounces. The head's curl is drawn as part of
 * the same outline path as the head itself in this glyph, so it can't lag
 * on its own — instead the mouth and eyes (genuinely separate paths) lag
 * a beat behind the head's motion, the same inertia-arrives-late idea as
 * the bell's clapper, just applied to the features instead of a curl.
 * Base geometry: Lucide `baby` (ISC).
 */
const DUR = 0.75
const BOUNCE = { y: [0, -1, 0, -0.6, 0] as number[], times: [0, 0.22, 0.44, 0.68, 1], ease: [easeOutQuart, gravity, easeOutQuart, gravity] }

export function BabyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'baby'}
      {...hoverProps}
    >
      <motion.path
        d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: { y: BOUNCE.y, transition: { duration: DUR, times: BOUNCE.times, ease: BOUNCE.ease } },
        }}
      />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: { y: BOUNCE.y, transition: { duration: DUR, delay: 0.03, times: BOUNCE.times, ease: BOUNCE.ease } },
        }}
      >
        <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
        <path d="M15 12h.01" />
        <path d="M9 12h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'baby',
  gesture: 'it giggles',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['child', 'infant', 'family'],
}

export default BabyIcon
