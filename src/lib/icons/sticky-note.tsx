import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Sticky note — it is posted. A soft press-and-pop stamp — smaller than a
 * rubber stamp, this is a fingertip pressing a note to a surface — while
 * the folded corner flexes narrower about its attached edge, the one part
 * of the shape that is actually free to move.
 * Base geometry: Lucide `sticky-note` (ISC).
 */
const DUR = 0.75

export function StickyNoteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sticky note'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.9, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
        <motion.path
          d="M15 3v5a1 1 0 0 0 1 1h5"
          style={{ transformBox: 'view-box', transformOrigin: '15px 5px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scaleX: 1 },
            animate: {
              scaleX: [1, 0.8, 1],
              transition: { duration: DUR, times: [0, 0.4, 0.75], ease: [easeInCubic, settleBack] },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'sticky-note',
  gesture: 'it is posted',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['memo', 'reminder', 'note'],
}

export default StickyNoteIcon
