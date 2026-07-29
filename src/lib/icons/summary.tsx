import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Summary — the gist rises. The headline stamps bold — a press and a pop —
 * while the two body lines dip a hair in deference. The document frame and
 * corner fold hold still.
 * Base geometry: Lucide `summary` (ISC).
 */
const DUR = 0.75

export function SummaryIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'summary'}
      {...hoverProps}
    >
      <motion.path
        d="M15 4H7"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.85, 1.18, 1],
            transition: { duration: DUR, times: [0, 0.24, 0.6, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <path d="m18 16 3 3-3 3" />
      <path d="M3 4v13a2 2 0 0 0 2 2h16" />
      {[
        { d: 'M7 9h12', delay: 0 },
        { d: 'M7 14h7', delay: 0.03 },
      ].map((line) => (
        <motion.path
          key={line.d}
          d={line.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 0.5, 0],
              transition: { duration: DUR, delay: line.delay, times: [0, 0.4, 0.8], ease: easeOutQuart },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'summary',
  gesture: 'the gist rises',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['tldr', 'digest', 'summary'],
}

export default SummaryIcon
