import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * Mail plus — a draft begins. VARIANT(mail): the envelope takes the same
 * small notification hop, and once it lands, the plus mark pops — dips to
 * nothing and overshoots back — a new draft starting.
 * Base geometry: Lucide `mail-plus` (ISC).
 */
const DUR = 1.0

export function MailPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mail plus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.6, 0.3, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: [easeOutQuart, gravity, easeOutQuart] },
          },
        }}
      >
        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
        <motion.path
          d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
          style={{ transformBox: 'view-box', transformOrigin: '12px 7px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scaleY: 1 },
            animate: {
              scaleY: [1, 1, 1.14, 1],
              transition: { duration: DUR, times: [0, 0.32, 0.62, 1], ease: ['linear', easeInOutCubic, easeOutQuart] },
            },
          }}
        />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.5, 0.68, 0.85, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M19 16v6" />
        <path d="M16 19h6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'mail-plus',
  gesture: 'a draft begins',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['email', 'compose', 'new'],
}

export default MailPlusIcon
