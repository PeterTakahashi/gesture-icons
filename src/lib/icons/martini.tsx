import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Martini — it is shaken. The whole glass rocks fast about its base,
 * decaying quickly — shaken, not stirred. (Lucide's martini glyph carries
 * no olive, so there's no separate garnish to lag; the base itself stays
 * the fixed point the glass wobbles against, honest to the geometry given.)
 * Base geometry: Lucide `martini` (ISC).
 */
const DUR = 0.55

export function MartiniIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'martini'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 2.5, -2, 1.2, -0.6, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.4, 0.62, 0.82, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 12 4.207 4.207A.707.707 0 0 1 4.707 3h14.586a.707.707 0 0 1 .5 1.207z" />
        <path d="M12 12v10" />
        <path d="M7 22h10" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'martini',
  gesture: 'it is shaken',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['cocktail', 'bar'],
}

export default MartiniIcon
