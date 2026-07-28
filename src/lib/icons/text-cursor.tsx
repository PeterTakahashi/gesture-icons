import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Text cursor — it waits for input. The stem — the part that reads as the
 * caret — hard-blinks twice, true binary steps with no fade, then stays lit:
 * a cursor settling into its idle blink and being caught at rest. The serif
 * feet on the left never move.
 * Base geometry: Lucide `text-cursor` (ISC).
 */
const DUR = 1.0

export function TextCursorIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'text cursor'}
      {...hoverProps}
    >
      <motion.path
        d="M17 22h-1a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4h1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.09, 0.1, 0.22, 0.23, 0.35, 0.36, 0.48, 0.49, 1],
              ease: 'linear',
            },
          },
        }}
      />
      <path d="M7 22h1a4 4 0 0 0 4-4" />
      <path d="M7 2h1a4 4 0 0 1 4 4" />
    </svg>
  )
}

export const meta = {
  name: 'text-cursor',
  gesture: 'it waits for input',
  family: 'secondary' as const,
  section: 'Text & editing',
  tags: ['caret', 'input'],
}

export default TextCursorIcon
