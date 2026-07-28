import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Bitcoin — it ticks volatile. A quick decaying rotate wobble reads as
 * price volatility, then a firm scale press-and-pop settles it — priced
 * anyway, despite the swings.
 * Base geometry: Lucide `bitcoin` (ISC).
 */
const DUR = 0.85

export function BitcoinIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bitcoin'}
      {...hoverProps}
    >
      <motion.path
        d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scale: 1 },
          animate: {
            rotate: [0, -6, 6, -4, 3, -1, 0],
            scale: [1, 1, 0.88, 1.15, 1],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.12, 0.26, 0.4, 0.52, 0.62, 0.7], ease: easeInOutCubic },
              scale: { times: [0, 0.7, 0.8, 0.92, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bitcoin',
  gesture: 'it ticks volatile',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['crypto', 'btc'],
}

export default BitcoinIcon
