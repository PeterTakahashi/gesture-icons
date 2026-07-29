import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Book audio — it does what it means. A small cover-tip beat (per
 * `book.tsx`, reduced) while the three level bars dance about their own
 * center lines like `audio-lines.tsx` — the audio playing as the cover
 * settles back down.
 * Base geometry: Lucide `book-audio` (ISC).
 */
const DUR = 1.0

export function BookAudioIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const bar = (peak1: number, peak2: number, delay: number): Variants => ({
    normal: { scaleY: 1 },
    animate: {
      scaleY: [1, peak1, 1, peak2, 1],
      transition: { duration: DUR, delay, times: [0, 0.24, 0.48, 0.72, 1], ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book audio'}
      {...hoverProps}
    >
      <motion.path
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
        style={{ transformBox: 'view-box', transformOrigin: '4px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -4, -4, 0],
            y: [0, 0, 0, 0.5, 0],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.32, 0.62, 0.88], ease: [easeOutQuart, 'linear', easeInOutCubic] },
              y: { times: [0, 0.85, 0.9, 0.96, 1], ease: ['linear', easeInOutCubic, easeOutQuart] },
            },
          },
        }}
      />
      <motion.path d="M8 8v3" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial="normal" animate={controls} variants={bar(0.65, 1.35, 0.05)} />
      <motion.path d="M12 6v7" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial="normal" animate={controls} variants={bar(1.35, 0.75, 0.12)} />
      <motion.path d="M16 8v3" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial="normal" animate={controls} variants={bar(0.7, 1.3, 0.19)} />
    </svg>
  )
}

export const meta = {
  name: 'book-audio',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['book', 'read', 'audio'],
}

export default BookAudioIcon
