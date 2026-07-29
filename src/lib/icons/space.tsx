import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Space — the bar is pressed. The only shape in this glyph is the spacebar
 * tray itself (no separate fold/unfold arrows to work with here), so the
 * honest verb is a keypress: it dips down on a hard stop and springs back.
 * Base geometry: Lucide `space` (ISC).
 */
const DUR = 0.6

export function SpaceIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'space'}
      {...hoverProps}
    >
      <motion.path
        d="M22 17v1c0 .5-.5 1-1 1H3c-.5 0-1-.5-1-1v-1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.4, 1.4, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: [easeInOutCubic, 'linear', settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'space',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['layout', 'arrange', 'space'],
}

export default SpaceIcon
