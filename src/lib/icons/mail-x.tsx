import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Mail x — it bounces. The X shakes "no" about its own center while the
 * envelope recoils a single step back — undeliverable.
 * Base geometry: Lucide `mail-x` (ISC).
 */
const DUR = 0.85

export function MailXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mail x'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.5], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, 11, -7, 4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m17 17 4 4" />
        <path d="m21 17-4 4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'mail-x',
  gesture: 'it bounces',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['email', 'failed', 'spam'],
}

export default MailXIcon
