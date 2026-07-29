import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Function square — it draws itself. The inner mark performs its own verb
 * inside a still frame: the f-glyph (curl + crossbar) is a math mark, so it
 * STAMPs — presses down a hair, pops past its own size, and lands — while
 * the frame takes one soft breath around it.
 * Base geometry: Lucide `function-square` (ISC).
 */
const DUR = 0.75

export function FunctionSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'function square'}
      {...hoverProps}
    >
      <motion.rect
        width="18" height="18" x="3" y="3" rx="2" ry="2"
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
        style={{ transformBox: 'view-box', transformOrigin: '11.9px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.85, 1.15, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3" />
        <path d="M9 11.2h5.7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'function-square',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['frame', 'mark', 'function', 'square'],
}

export default FunctionSquareIcon
