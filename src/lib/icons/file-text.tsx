import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * File text — the lines write themselves. The page and its folded corner
 * hold still; the three text rules un-draw top to bottom, then a pen
 * rewrites them in the same order a hand would — top line first, staggered
 * a beat apart, each easing into its stop.
 * Base geometry: Lucide `file-text` (ISC).
 */
const DUR = 1.0
const LINES = ['M10 9H8', 'M16 13H8', 'M16 17H8']

export function FileTextIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file text'}
      {...hoverProps}
    >
      <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      {LINES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [1, 0.001, 0.001, 1],
              transition: {
                duration: DUR,
                delay: i * 0.08,
                times: [0, 0.3, 0.46, 0.9],
                ease: [easeInCubic, 'linear', pen],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'file-text',
  gesture: 'the lines write themselves',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['document', 'doc', 'page', 'text'],
}

export default FileTextIcon
