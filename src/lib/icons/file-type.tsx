import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic, pen } from '../core/easings'

/**
 * File type — it draws itself. The page holds, dipping once on the accent
 * frame; the serif T un-draws and pen-redraws in the order a hand would
 * write it — the cap, then the stem, then the base.
 * Base geometry: Lucide `file-type` (ISC).
 */
const DUR = 0.9
const STROKES = ['M9 13v-.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v.5', 'M12 12v6', 'M11 18h2']

export function FileTypeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file type'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.45, 0.6, 0.95], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      {STROKES.map((d, i) => (
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
                duration: 0.75,
                delay: i * 0.08,
                times: [0, 0.3, 0.46, 0.95],
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
  name: 'file-type',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'type'],
}

export default FileTypeIcon
