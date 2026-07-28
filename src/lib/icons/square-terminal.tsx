import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { settleBack, easeOutQuart } from '../core/easings'

/**
 * Square terminal — VARIANT(terminal): the prompt is ready. Same beat as
 * `terminal.tsx` inside the fixed square frame — the cursor line hard-blinks
 * twice, true binary steps, then the chevron nudges forward as if a command
 * had just been submitted.
 * Base geometry: Lucide `square-terminal` (ISC).
 */
const DUR = 1.1

export function SquareTerminalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'square terminal'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <motion.path
        d="m7 11 2-2-2-2"
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
      {/* underscore: a true binary blink, never a fade */}
      <motion.path
        d="M11 13h4"
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
  name: 'square-terminal',
  gesture: 'the prompt is ready',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['cli', 'shell', 'console'],
}

export default SquareTerminalIcon
