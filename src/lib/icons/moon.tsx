import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Moon — it drifts asleep. A slow tilt about the icon's center, holding at
 * its furthest lean before straightening back up — nodding off, once.
 * Base geometry: Lucide `moon` (ISC).
 */
const DUR = 1.2

export function MoonIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'moon'}
      {...hoverProps}
    >
      <motion.path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, -14, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.6, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'moon',
  gesture: 'it drifts asleep',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['night', 'dark', 'sleep', 'lunar'],
}

export default MoonIcon
