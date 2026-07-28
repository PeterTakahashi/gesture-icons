import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Headphones — it bops to the beat. The whole band dips twice about its own
 * base, a small nod-along rather than a bounce, smaller than a heartbeat.
 * Base geometry: Lucide `headphones` (ISC).
 */
const DUR = 0.95

export function HeadphonesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'headphones'}
      {...hoverProps}
    >
      <motion.path
        d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 0.96, 1, 0.95, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.46, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'headphones',
  gesture: 'it bops to the beat',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['audio', 'music', 'listen'],
}

export default HeadphonesIcon
