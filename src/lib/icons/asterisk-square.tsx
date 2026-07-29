import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Asterisk square — it draws itself. The inner mark performs its own verb:
 * these three strokes are 6-fold symmetric like asterisk.tsx, so a 60° turn
 * is a free landing — a small counter windup, a turn past the mark, and a
 * settle onto a picture identical to rest. The frame breathes once, softly.
 * Base geometry: Lucide `asterisk-square` (ISC).
 */
const DUR = 0.8
const OVER_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1.1]

export function AsteriskSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'asterisk square'}
      {...hoverProps}
    >
      <motion.rect
        width="18" height="18" x="3" y="3" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
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
        <path d="M12 8v8" />
        <path d="m8.5 14 7-4" />
        <path d="m8.5 10 7 4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'asterisk-square',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['frame', 'mark', 'asterisk', 'square'],
}

export default AsteriskSquareIcon
