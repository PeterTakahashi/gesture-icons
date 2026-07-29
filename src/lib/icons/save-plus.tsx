import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Save plus — one more is added. The plus dips to almost nothing and pops
 * back past its own size before settling, and the save body takes a small
 * y dip exactly on that pop frame — a new save landing in the stack.
 * Everything else on the glyph holds still.
 * Base geometry: Lucide `save-plus` (ISC).
 */
const DUR = 1.0

export function SavePlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'save plus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.55, 0.62], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M12.5 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V12" />
        <path d="M16 13H8a1 1 0 0 0-1 1v7" />
        <path d="M7 3v4a1 1 0 0 0 1 1h7" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.6, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M19 22v-6" />
        <path d="M22 19h-6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'save-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['add', 'new', 'save', 'plus'],
}

export default SavePlusIcon
