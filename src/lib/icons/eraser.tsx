import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Eraser — it rubs out. The body scrubs sideways along its own long axis,
 * three diminishing rubs with a slight rock to each one — while the crease
 * marking what it has already rubbed clean stays put, the residue it is
 * leaving behind rather than something the body drags along with it.
 * Base geometry: Lucide `eraser` (ISC).
 */
const DUR = 0.9

export function EraserIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'eraser'}
      {...hoverProps}
    >
      <motion.path
        d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, rotate: 0 },
          animate: {
            x: [0, -2, 1.6, -1, 0],
            rotate: [0, -3, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.46, 0.7, 0.92], ease: easeInOutCubic },
          },
        }}
      />
      <path d="m5.082 11.09 8.828 8.828" />
    </svg>
  )
}

export const meta = {
  name: 'eraser',
  gesture: 'it rubs out',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['delete', 'remove'],
}

export default EraserIcon
