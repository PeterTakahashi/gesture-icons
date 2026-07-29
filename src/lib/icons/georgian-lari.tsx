import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Georgian lari — it rings up. Same stamp-with-a-turn as dollar-sign.tsx:
 * press, twist a hair, pop past size, settle — the till closing on a sale.
 * Base geometry: Lucide `georgian-lari` (ISC).
 */
const DUR = 0.7

export function GeorgianLariIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'georgian lari'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11.5px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.9, 1.12, 1],
            rotate: [0, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M11.5 21a7.5 7.5 0 1 1 7.35-9" />
        <path d="M13 12V3" />
        <path d="M4 21h16" />
        <path d="M9 12V3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'georgian-lari',
  gesture: 'it lands with intent',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['money', 'currency', 'georgian', 'lari'],
}

export default GeorgianLariIcon
