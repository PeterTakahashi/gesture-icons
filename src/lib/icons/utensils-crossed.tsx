import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Utensils crossed — the toast is made. Both utensils lift together and
 * hold at the top of the lift where they clink — read as a tiny scale pulse
 * at the point they cross — then set back down.
 * Base geometry: Lucide `utensils-crossed` (ISC).
 */
const DUR = 0.85

export function UtensilsCrossedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'utensils crossed'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '15px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, scale: 1 },
          animate: {
            y: [0, -1.5, -1.5, 0],
            scale: [1, 1, 1.06, 1, 1],
            transition: {
              duration: DUR,
              y: { times: [0, 0.3, 0.65, 1], ease: [easeOutQuart, 'linear', easeOutQuart] },
              scale: { times: [0, 0.3, 0.45, 0.6, 1], ease: ['linear', settleBack, 'linear', easeOutQuart] },
            },
          },
        }}
      >
        <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
        <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
        <path d="m2.1 21.8 6.4-6.3" />
        <path d="m19 5-7 7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'utensils-crossed',
  gesture: 'the toast is made',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['cutlery', 'finish'],
}

export default UtensilsCrossedIcon
