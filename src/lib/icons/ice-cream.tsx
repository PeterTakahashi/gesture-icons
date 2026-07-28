import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Ice cream — the scoop settles into the cone. The scoop (dome + drip)
 * presses down and rebounds once; the cone/rim takes the contact ~3% after
 * the scoop reaches it, never before — seated, not sliding off.
 * Base geometry: Lucide `ice-cream` (ISC).
 */
const DUR = 0.75

export function IceCreamIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ice cream'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.9, -0.3, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.62, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m7 11 4.08 10.35a1 1 0 0 0 1.84 0L17 11" />
        <path d="M17 7A5 5 0 0 0 7 7" />
      </motion.g>
      <motion.path
        d="M17 7a2 2 0 0 1 0 4H7a2 2 0 0 1 0-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.35, -0.1, 0],
            transition: {
              duration: DUR,
              times: [0, 0.35, 0.48, 0.7, 1],
              ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'ice-cream',
  gesture: 'the scoop settles',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['dessert', 'summer'],
}

export default IceCreamIcon
