import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Asterisk — it footnotes. The three strokes are 6-fold symmetric (60°
 * apart), so a 60° turn is a free landing: a small counter windup, a turn
 * past the mark, and a settle back onto a picture identical to rest — the
 * little star of terms and conditions, spinning once.
 * Base geometry: Lucide `asterisk` (ISC).
 */
const DUR = 0.8
const OVER_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1.1]

export function AsteriskIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'asterisk'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 66, 60],
            transition: { duration: DUR, times: [0, 0.15, 0.75, 1], ease: [easeInOutCubic, OVER_EASE, easeOutQuart] },
          },
        }}
      >
        <path d="M12 6v12" />
        <path d="M17.196 9 6.804 15" />
        <path d="m6.804 9 10.392 6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'asterisk',
  gesture: 'it footnotes',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['required', 'note', 'wildcard'],
}

export default AsteriskIcon
