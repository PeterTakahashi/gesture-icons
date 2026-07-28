import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Eclipse — it passes across. The shadow arc — the crescent cut across the
 * disc — is the thing in transit: it nudges rightward slowly and settles
 * back, while the sun's disc it passes over stays fixed. A slow beat, since
 * an eclipse is not in a hurry.
 * Base geometry: Lucide `eclipse` (ISC).
 */
const DUR = 1.4

export function EclipseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'eclipse'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="M12 2a7 7 0 1 0 10 10"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 2.2, 2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 0.7, 1], ease: [easeInOutCubic, easeInCubic, settleBack, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'eclipse',
  gesture: 'it passes across',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['sun', 'moon', 'rare'],
}

export default EclipseIcon
