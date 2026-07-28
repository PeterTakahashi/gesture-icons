import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Calculator — it computes. The top row of three key dots presses in
 * sequence, left to right, 70ms apart, then the display line hard-blinks
 * once — the answer arriving. Body, other keys, and the tall enter key
 * never move.
 * Base geometry: Lucide `calculator` (ISC).
 */
const KEYS = [
  { cx: 8, cy: 10, delay: 0 },
  { cx: 12, cy: 10, delay: 0.07 },
  { cx: 16, cy: 10, delay: 0.14 },
]

export function CalculatorIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const key = (delay: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.6, 1.2, 1],
      transition: { duration: 0.45, delay, times: [0, 0.3, 0.65, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'calculator'}
      {...hoverProps}
    >
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <motion.line
        x1="8" x2="16" y1="6" y2="6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1],
            transition: { duration: 0.4, delay: 0.62, times: [0, 0.5, 0.55, 0.9, 1], ease: 'linear' },
          },
        }}
      />
      <line x1="16" x2="16" y1="14" y2="18" />
      {KEYS.map((k) => (
        <motion.path
          key={`${k.cx}-${k.cy}`}
          d={`M${k.cx} ${k.cy}h.01`}
          style={{ transformBox: 'view-box', transformOrigin: `${k.cx}px ${k.cy}px` }}
          initial="normal"
          animate={controls}
          variants={key(k.delay)}
        />
      ))}
      <path d="M12 14h.01" />
      <path d="M8 14h.01" />
      <path d="M12 18h.01" />
      <path d="M8 18h.01" />
    </svg>
  )
}

export const meta = {
  name: 'calculator',
  gesture: 'it computes',
  family: 'secondary' as const,
  section: 'Charts & math',
  tags: ['math', 'numbers'],
}

export default CalculatorIcon
