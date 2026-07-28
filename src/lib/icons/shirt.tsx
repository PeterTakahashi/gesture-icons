import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Shirt — it is shaken out. A decaying shake hinged at the collar, each
 * swing smaller than the last, finishing on a smoothing settle rather than
 * a hard stop — fresh from the line. The whole shirt is a single compound
 * outline in this glyph, so the "hem lagging behind the collar" is honestly
 * folded into the decay curve itself (bigger first, calming down) rather
 * than a separate lagging layer the geometry doesn't provide.
 * Base geometry: Lucide `shirt` (ISC).
 */
const DUR = 0.8

export function ShirtIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shirt'}
      {...hoverProps}
    >
      <motion.path
        d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -3, 3, -2, 1.5, -0.8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.3, 0.46, 0.62, 0.8, 1],
              ease: [easeInOutCubic, easeInOutCubic, easeInOutCubic, easeInOutCubic, easeInOutCubic, easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'shirt',
  gesture: 'it is shaken out',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['clothes', 'fashion', 'laundry'],
}

export default ShirtIcon
