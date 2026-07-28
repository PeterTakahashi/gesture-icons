import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Refrigerator — the door swings shut. This glyph draws door and body as one
 * outline, so the whole silhouette (plus the divider and handle riding along
 * with it) is what opens: it rotates out about the hinge edge, holds, and
 * swings shut with an easeInCubic close — landing with a small squash thump
 * on contact, never a frame before it.
 * Base geometry: Lucide `refrigerator` (ISC).
 */
const DUR = 1.0

export function RefrigeratorIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'refrigerator'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '5px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scaleX: 1, scaleY: 1 },
          animate: {
            rotate: [0, -6, -6, 0, 0],
            scaleX: [1, 1, 1, 1.02, 1],
            scaleY: [1, 1, 1, 0.97, 1],
            transition: { duration: DUR, times: [0, 0.24, 0.62, 0.86, 1], ease: [easeOutQuart, 'linear', easeInCubic, settleBack] },
          },
        }}
      >
        <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
        <path d="M5 10h14" />
        <path d="M15 7v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'refrigerator',
  gesture: 'the door swings shut',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['kitchen', 'appliance'],
}

export default RefrigeratorIcon
