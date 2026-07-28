import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Shopping bag — it is picked up. Lifted by the handles, it sways gently
 * while held, then it is set down with a soft landing dip. The pivot sits
 * where the hands would grip it, at the top center of the handles.
 * Base geometry: Lucide `shopping-bag` (ISC).
 */
const DUR = 1.15

export function ShoppingBagIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shopping bag'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -2.5, -2.5, 0.6, 0],
            rotate: [0, 3, -2, 0],
            transition: {
              duration: DUR,
              y: { times: [0, 0.22, 0.62, 0.86, 1], ease: [easeOutQuart, 'linear', gravity, easeOutQuart] },
              rotate: { times: [0, 0.3, 0.6, 1], ease: easeInOutCubic },
            },
          },
        }}
      >
        <path d="M16 10a4 4 0 0 1-8 0" />
        <path d="M3.103 6.034h17.794" />
        <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'shopping-bag',
  gesture: 'it is picked up',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['purchase', 'store', 'buy', 'bag'],
}

export default ShoppingBagIcon
