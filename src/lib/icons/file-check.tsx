import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, easeOutQuart, pen } from '../core/easings'

/**
 * File check — the doc is approved. The check erases fast and the pen
 * redraws it stroke-order, the same beat as check.tsx; the page takes a
 * small dip right as the tick lands, approval landing on the page it
 * belongs to.
 * Base geometry: Lucide `file-check` (ISC).
 */
const DUR = 1.0

export function FileCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.62, 0.76, 0.9, 1], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <motion.path
        d="m9 15 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.38, 0.76], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'file-check',
  gesture: 'the doc is approved',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['document', 'done'],
}

export default FileCheckIcon
