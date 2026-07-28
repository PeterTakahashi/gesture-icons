import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Shield plus — protection is added. VARIANT(shield): the shield braces
 * first, then the plus mark pops — dips to nothing and overshoots back —
 * reading as new protection being added once the shield has set.
 * Base geometry: Lucide `shield-plus` (ISC).
 */
const DUR = 1.0

export function ShieldPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shield plus'}
      {...hoverProps}
    >
      <motion.path
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.95, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.14, 0.3, 0.42], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.42, 0.58, 0.8, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M9 12h6" />
        <path d="M12 9v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'shield-plus',
  gesture: 'protection is added',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['add', 'protect'],
}

export default ShieldPlusIcon
