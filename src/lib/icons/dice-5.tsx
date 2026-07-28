import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Dice 5 — it comes up five. The die hops and turns 90° in one tumble; a
 * square is 4-fold symmetric so the landing is free — 90° reads identical
 * to 0°. While airborne the rotation is linear (nothing tossed is eased in
 * flight) and the pips blink out — you can't read a face mid-tumble — then
 * blink back the instant it lands.
 * Base geometry: Lucide `dice-5` (ISC).
 */
const DUR = 0.9

export function Dice5Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'dice 5'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -2, -2, 0.3, 0],
            rotate: [0, 45, 90, 90, 90],
            transition: {
              duration: DUR,
              y: { times: [0, 0.3, 0.55, 0.7, 1], ease: [easeOutQuart, 'linear', gravity, easeOutQuart] },
              rotate: { times: [0, 0.3, 0.55, 0.7, 1], ease: 'linear' },
            },
          },
        }}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        {[
          { d: 'M16 8h.01' }, { d: 'M8 8h.01' }, { d: 'M8 16h.01' }, { d: 'M16 16h.01' }, { d: 'M12 12h.01' },
        ].map((p) => (
          <motion.path
            key={p.d}
            d={p.d}
            initial="normal"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 1, 0, 0, 1, 1],
                transition: { duration: DUR, times: [0, 0.28, 0.3, 0.68, 0.7, 1], ease: 'linear' },
              },
            }}
          />
        ))}
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'dice-5',
  gesture: 'it comes up five',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['game', 'random', 'chance'],
}

export default Dice5Icon
