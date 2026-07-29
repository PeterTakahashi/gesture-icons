import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Sticker — it peels and sticks. The already-folded corner lifts further
 * about its own fold, then the whole sticker presses flat with a stamp's
 * settle-back pop — smoothed down and applied.
 * Base geometry: Lucide `sticker` (ISC).
 */
const DUR = 1.0

export function StickerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sticker'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.94, 1.05, 1],
            transition: { duration: DUR, times: [0, 0.42, 0.62, 0.82, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z" />
        <motion.path
          d="M15 3v5a1 1 0 0 0 1 1h5"
          style={{ transformBox: 'view-box', transformOrigin: '15px 8px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scaleY: 1 },
            animate: {
              scaleY: [1, 1.3, 1],
              transition: { duration: DUR, times: [0, 0.3, 0.42], ease: easeOutQuart },
            },
          }}
        />
        <path d="M8 13h.01" />
        <path d="M16 13h.01" />
        <path d="M10 16s.8 1 2 1c1.3 0 2-1 2-1" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'sticker',
  gesture: 'it peels and sticks',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['label', 'fun', 'decoration', 'sticker'],
}

export default StickerIcon
