import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, pen } from '../core/easings'

/**
 * Edit — VARIANT(pencil): the pen writes, tip-pivoted at the point of the
 * blade (8.64, 15.98) with a small x/y jot; the folder frame beneath holds
 * still — it is the document being edited, not the thing doing the editing.
 * Base geometry: Lucide `edit` (ISC).
 */
const DUR = 0.85

export function EditIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'edit'}
      {...hoverProps}
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <motion.path
        d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
        style={{ transformBox: 'view-box', transformOrigin: '8.64px 15.98px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0, y: 0 },
          animate: {
            rotate: [0, -9, 4, 0],
            x: [0, 0, -1, 0],
            y: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeInOutCubic, pen, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'edit',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['edit', 'write'],
}

export default EditIcon
