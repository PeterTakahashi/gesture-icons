import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Smile — it smiles. The mouth erases and rewrites itself with a pen
 * stroke — the smile forming, not fading in — and the eyes pop just
 * before the mouth finishes, because the eyes smile first. The face
 * outline never moves.
 * Base geometry: Lucide `smile` (ISC).
 */
const DUR = 1.0
const EYES = [9, 15]

export function SmileIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'smile'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="M8 14s1.5 2 4 2 4-2 4-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.18, 0.26, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      {EYES.map((cx, i) => (
        <motion.line
          key={cx}
          x1={cx} x2={cx + 0.01} y1="9" y2="9"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1, 1.25, 1, 1],
              transition: {
                duration: DUR,
                delay: i * 0.04,
                times: [0, 0.6, 0.72, 0.84, 1],
                ease: ['linear', settleBack, easeOutQuart, 'linear'],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'smile',
  gesture: 'it smiles',
  family: 'draw-on' as const,
  section: 'People',
  tags: ['happy', 'face', 'emoji', 'positive'],
}

export default SmileIcon
