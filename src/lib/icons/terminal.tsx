import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { settleBack, easeOutQuart } from '../core/easings'

/**
 * Terminal — the prompt types. The cursor line blinks twice, a true binary
 * step with no fade (a terminal cursor does not dim, it is on or off), then
 * the chevron nudges forward as if a command had just been submitted.
 * Base geometry: Lucide `terminal` (ISC).
 */
const DUR = 1.1

export function TerminalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'terminal'}
      {...hoverProps}
    >
      <motion.path
        d="m4 17 6-6-6-6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.55, 0.78, 1], ease: ['linear', settleBack, easeOutQuart] },
          },
        }}
      />
      {/* cursor: a true binary blink, never a fade */}
      <motion.path
        d="M12 19h8"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.09, 0.1, 0.22, 0.23, 0.35, 0.36, 0.48, 0.49, 0.55],
              ease: 'linear',
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'terminal',
  gesture: 'the prompt types',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['cli', 'shell', 'console', 'command'],
}

export default TerminalIcon
