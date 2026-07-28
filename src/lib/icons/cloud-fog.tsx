import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cloud fog — the fog settles. The cloud holds; only the two fog lines
 * drift, each the opposite way from the other, slow and even — a bank of
 * fog sliding past, not the cloud itself moving.
 * Base geometry: Lucide `cloud-fog` (ISC).
 */
const DUR = 1.2

export function CloudFogIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud fog'}
      {...hoverProps}
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <motion.path
        d="M16 17H7"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 2, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M17 21H9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -2, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cloud-fog',
  gesture: 'the fog settles',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'mist'],
}

export default CloudFogIcon
