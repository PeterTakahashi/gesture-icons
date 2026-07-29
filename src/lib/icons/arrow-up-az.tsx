import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Arrow up az — it makes its move. The arrow NUDGEs up on the base clock
 * while the two letters stamp in top-down order, an 8% beat apart — A then
 * Z, the alphabetical order settling top to bottom.
 * Base geometry: Lucide `arrow-up-az` (ISC).
 */
const DUR = 0.85
const STAGGER = 0.08 * DUR

function stamp(delay: number): Variants {
  return {
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.82, 1.14, 1],
      transition: { duration: DUR * 0.7, delay, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
    },
  }
}

export function ArrowUpAzIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'arrow up az'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.5, -3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.59, 0.97], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17.5px 8.25px' }}
        initial="normal" animate={controls} variants={stamp(0)}
      >
        <path d="M20 8h-5" />
        <path d="M15 10V6.5a2.5 2.5 0 0 1 5 0V10" />
      </motion.g>
      <motion.path
        d="M15 14h5l-5 6h5"
        style={{ transformBox: 'view-box', transformOrigin: '17.5px 17px' }}
        initial="normal" animate={controls} variants={stamp(STAGGER)}
      />
    </svg>
  )
}

export const meta = {
  name: 'arrow-up-az',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['arrow', 'sort'],
}

export default ArrowUpAzIcon
