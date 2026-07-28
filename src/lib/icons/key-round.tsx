import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart } from '../core/easings'

/**
 * Key round — it turns. VARIANT(key): the same rotating-key pun, hinged
 * about the bow's own hole this time. A small counter-grip wind-up, the
 * turn past 90° as the lock gives, a held beat, then back home.
 * Base geometry: Lucide `key-round` (ISC).
 */
const DUR = 1.1

export function KeyRoundIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'key round'}
      {...hoverProps}
    >
      {/* the bow's hole (18.5? no — 16.5,7.5) is the hinge the whole key turns about */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '16.5px 7.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, 90, 90, -5, 0],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.4, 0.58, 0.86, 1],
              ease: [easeInOutCubic, [0.5, 0, 0.3, 1.1], 'linear', easeInOutQuart, easeOutQuart],
            },
          },
        }}
      >
        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'key-round',
  gesture: 'it turns',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['password', 'access'],
}

export default KeyRoundIcon
