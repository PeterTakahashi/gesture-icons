import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Plus — it stamps. The whole cross presses down a hair, pops past its
 * own size, and lands — the beat of a rubber stamp hitting the page, not
 * a bounce for its own sake.
 * Base geometry: Lucide `plus` (ISC).
 */
const DUR = 0.7

export function PlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'plus'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.82, 1.14, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'plus',
  gesture: 'it stamps',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['add', 'new', 'create'],
}

export default PlusIcon
