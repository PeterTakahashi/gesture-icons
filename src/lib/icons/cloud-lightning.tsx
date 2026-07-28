import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Cloud lightning — the bolt strikes. It cuts out to nothing at its own
 * attach point, holds dark for a beat, then slams back with an overshoot —
 * the strike — and the cloud takes the jolt on the same frame.
 * Base geometry: Lucide `cloud-lightning` (ISC).
 */
const DUR = 0.9

export function CloudLightningIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud lightning'}
      {...hoverProps}
    >
      <motion.path
        d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.9, 0],
            transition: { duration: DUR, times: [0, 0.58, 0.68, 0.8], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="m13 12-3 5h4l-3 5"
        style={{ transformBox: 'view-box', transformOrigin: '13px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 0.001, 1.35, 1],
            transition: {
              duration: DUR,
              times: [0, 0.07, 0.4, 0.6, 1],
              ease: [easeInCubic, 'linear', settleBack, easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cloud-lightning',
  gesture: 'the bolt strikes',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['storm', 'thunder', 'electric'],
}

export default CloudLightningIcon
