import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart } from '../core/easings'

/**
 * File code — the code compiles. VARIANT(code), small: the two chevrons
 * press outward, away from each other, hold a beat apart, and close back —
 * the same breathing brackets as code.tsx, scaled down, inside the still
 * page.
 * Base geometry: Lucide `file-code` (ISC).
 */
const DUR = 0.8

export function FileCodeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file code'}
      {...hoverProps}
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <motion.path
        d="M10 12.5 8 15l2 2.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1.2, -1.2, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 1], ease: [easeInOutQuart, 'linear', easeInOutQuart] },
          },
        }}
      />
      <motion.path
        d="m14 12.5 2 2.5-2 2.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 1.2, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 1], ease: [easeInOutQuart, 'linear', easeInOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'file-code',
  gesture: 'the code compiles',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['document', 'dev', 'source'],
}

export default FileCodeIcon
