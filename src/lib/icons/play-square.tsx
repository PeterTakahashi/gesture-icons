import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Play square — VARIANT(play-circle): the triangle presses in and pops
 * forward exactly as it does bare/in-a-ring; the square frame breathes with
 * it on the same beat, never its own clock.
 * Base geometry: Lucide `play-square` (ISC).
 */
const DUR = 0.85

export function PlaySquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'play square'}
      {...hoverProps}
    >
      <motion.rect
        x="3" y="3" width="18" height="18" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 0.85], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M9 9.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997A1 1 0 0 1 9 14.996z"
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
  name: 'play-square',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['frame', 'mark', 'play', 'square'],
}

export default PlaySquareIcon
