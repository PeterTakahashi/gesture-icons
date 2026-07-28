import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Mail open — the letter is read. The envelope holds still; the open flap
 * lifts further about its top fold, holds a beat while it "reads," and
 * closes gently back down — the inner edge peeking up with it.
 * Base geometry: Lucide `mail-open` (ISC).
 */
const DUR = 1.15

export function MailOpenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mail open'}
      {...hoverProps}
    >
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <motion.path
        d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -8, -8, 0],
            y: [0, -0.8, -0.8, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.68, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'mail-open',
  gesture: 'the letter is read',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['email', 'read', 'inbox'],
}

export default MailOpenIcon
