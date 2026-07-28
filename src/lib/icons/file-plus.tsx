import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * File plus — a page is added. VARIANT(file): same page and folded corner as
 * the base file glyph; the distinguishing plus pops (dips to nothing,
 * overshoots, settles) about the center of its own cross, and the page dips
 * a hair on the frame the plus lands.
 * Base geometry: Lucide `file-plus` (ISC).
 */
const DUR = 1.0

export function FilePlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file plus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.62, 0.85], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M9 15h6" />
        <path d="M12 18v-6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-plus',
  gesture: 'a page is added',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['document', 'new', 'create'],
}

export default FilePlusIcon
