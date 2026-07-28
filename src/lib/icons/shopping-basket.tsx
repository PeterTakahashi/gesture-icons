import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Shopping basket — it takes the goods. Something lands in it: the basket
 * body dips under the weight and rebounds, while the two crossed handles —
 * held steady by a hand — follow ~3% late, the way a carried thing lags the
 * jolt of what just dropped into it.
 * Base geometry: Lucide `shopping-basket` (ISC).
 */
const DUR = 0.85

function dip(delay = 0): Variants {
  return {
    normal: { y: 0 },
    animate: {
      y: [0, 0, 1.2, -0.3, 0],
      transition: {
        duration: DUR,
        delay,
        times: [0, 0.4, 0.56, 0.78, 1],
        ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart],
      },
    },
  }
}

export function ShoppingBasketIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shopping basket'}
      {...hoverProps}
    >
      {/* basket body: rim, bowl outline, weave line, side facets */}
      <motion.g initial="normal" animate={controls} variants={dip()}>
        <path d="M2 11h20" />
        <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
        <path d="M4.5 15.5h15" />
        <path d="m15 11-1 9" />
        <path d="m9 11 1 9" />
      </motion.g>
      {/* handles: held by the hand, follow the jolt a beat late */}
      <motion.path d="m19 11-4-7" initial="normal" animate={controls} variants={dip(DUR * 0.03)} />
      <motion.path d="m5 11 4-7" initial="normal" animate={controls} variants={dip(DUR * 0.03)} />
    </svg>
  )
}

export const meta = {
  name: 'shopping-basket',
  gesture: 'it takes the goods',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['buy', 'store'],
}

export default ShoppingBasketIcon
