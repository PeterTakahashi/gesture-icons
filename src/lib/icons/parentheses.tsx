import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Parentheses — they enclose. The two curves draw together, closing the
 * gap between them as if embracing whatever they wrap, then ease back
 * open to rest.
 * Base geometry: Lucide `parentheses` (ISC).
 */
const DUR = 0.8

export function ParenthesesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'parentheses'}
      {...hoverProps}
    >
      <motion.path
        d="M8 21s-4-3-4-9 4-9 4-9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M16 3s4 3 4 9-4 9-4 9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1.2, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'parentheses',
  gesture: 'they enclose',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['code', 'group', 'math', 'parentheses'],
}

export default ParenthesesIcon
