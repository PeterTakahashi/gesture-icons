import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Cloud sun — the sun breaks through. A classic NUDGE: the cloud winds up
 * a hair the wrong way, then slides aside, while the sun's rays reach out
 * about its own centre — a gap opening in the weather — before both settle
 * back to rest together.
 * Base geometry: Lucide `cloud-sun` (ISC).
 */
const DUR = 1.0

export function CloudSunIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud sun'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.2, 1],
            transition: { duration: DUR, times: [0, 0.4, 0.68, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 2v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="M20 12h2" />
        <path d="m19.07 4.93-1.41 1.41" />
        <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
      </motion.g>
      <motion.path
        d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.5, 2, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.6, 1], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cloud-sun',
  gesture: 'the sun breaks through',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'partly', 'fair'],
}

export default CloudSunIcon
