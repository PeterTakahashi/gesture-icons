import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Image play — it does what it means. VARIANT(image + play): the sun lifts
 * and settles exactly as in `image.tsx`; the play triangle presses in and
 * pops forward exactly as bare `play.tsx` does, on the same clock. The
 * frame and mountain line hold still.
 * Base geometry: Lucide `image-play` (ISC).
 */
const DUR = 0.9

export function ImagePlayIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'image play'}
      {...hoverProps}
    >
      <path d="M21 12.17V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
      <path d="m6 21 5-5" />
      <motion.circle
        cx="9" cy="9" r="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.8, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: [easeOutQuart, easeInOutCubic, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M15 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, x: 0 },
          animate: {
            scale: [1, 0.9, 1.08, 1],
            x: [0, 0, 1.4, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'image-play',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['media', 'image', 'play'],
}

export default ImagePlayIcon
