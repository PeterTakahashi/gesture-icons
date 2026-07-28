import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart } from '../core/easings'

/**
 * Code — the brackets breathe. The two chevrons press outward, away from
 * each other, hold a beat apart, and close back — the code block opening
 * just enough to admit a line, never a full split.
 * Base geometry: Lucide `code` (ISC).
 */
const DUR = 0.9

export function CodeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'code'}
      {...hoverProps}
    >
      <motion.path
        d="m8 6-6 6 6 6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1.8, -1.8, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 1], ease: [easeInOutQuart, 'linear', easeInOutQuart] },
          },
        }}
      />
      <motion.path
        d="m16 18 6-6-6-6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 1.8, 1.8, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 1], ease: [easeInOutQuart, 'linear', easeInOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'code',
  gesture: 'the brackets breathe',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['dev', 'programming', 'html', 'source'],
}

export default CodeIcon
