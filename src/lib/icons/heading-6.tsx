import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Heading 6 — it lands with intent. The H STAMPs first — a short, firm
 * press and pop — then the "6" pops in right after, a touch bigger, on the
 * same clock: a heading level set in place.
 * Base geometry: Lucide `heading-6` (ISC).
 */
const DUR = 0.8

export function Heading6Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'heading 6'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '8px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.94, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.18, 0.4, 0.8], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M4 12h8" />
        <path d="M4 18V6" />
        <path d="M12 18V6" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.6, 1.25, 1],
            transition: { duration: DUR, times: [0, 0.35, 0.62, 0.9], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <circle cx="19" cy="16" r="2" />
        <path d="M20 10c-2 2-3 3.5-3 6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'heading-6',
  gesture: 'it lands with intent',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['heading', 'text', 'title'],
}

export default Heading6Icon
