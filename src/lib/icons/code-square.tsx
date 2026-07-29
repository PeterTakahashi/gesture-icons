import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Code square — machine-text flavor. The two chevrons hard-BLINK, never a
 * fade: the left mark flickers twice, then the right mark flickers twice a
 * beat later, reading as a laser scanning left to right before both settle
 * steady. The frame holds — it is being scanned, not touched.
 * Base geometry: Lucide `code-square` (ISC).
 */
const DUR = 0.9

export function CodeSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'code square'}
      {...hoverProps}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <motion.path
        d="m10 9-3 3 3 3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.06, 0.07, 0.15, 0.16, 0.24, 0.25, 0.33, 0.34, 0.42],
              ease: 'linear',
            },
          },
        }}
      />
      <motion.path
        d="m14 15 3-3-3-3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.24, 0.25, 0.33, 0.34, 0.42, 0.43, 0.51, 0.52, 0.6],
              ease: 'linear',
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'code-square',
  gesture: 'it signals',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['code', 'scan', 'square'],
}

export default CodeSquareIcon
