import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Variable — x changes value. The crossing strokes that form the "x" shake
 * once, small, about their own center, then stamp — press and pop — as if
 * a new value had just been solved for. The brackets never move.
 * Base geometry: Lucide `variable` (ISC).
 */
const DUR = 0.9

export function VariableIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'variable'}
      {...hoverProps}
    >
      <path d="M8 21s-4-3-4-9 4-9 4-9" />
      <path d="M16 3s4 3 4 9-4 9-4 9" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scale: 1 },
          animate: {
            rotate: [0, -5, 4, -2, 0],
            scale: [1, 1, 0.88, 1.15, 1],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.15, 0.3, 0.42, 0.5], ease: easeInOutCubic },
              scale: { times: [0, 0.5, 0.62, 0.82, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
            },
          },
        }}
      >
        <line x1="15" x2="9" y1="9" y2="15" />
        <line x1="9" x2="15" y1="9" y2="15" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'variable',
  gesture: 'x changes value',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['math', 'algebra'],
}

export default VariableIcon
