import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic, gravity } from '../core/easings'

/**
 * Mail — you've got mail. The whole envelope takes a small notification
 * bump — up, overshoot down, settle — and the flap presses back down over
 * it right as it lands, like it just sealed the new letter inside.
 * (The spec's alternative — a letter rising and clipping to the envelope's
 * interior — was tried and reads muddy at 24px on a glyph with no open
 * top; the bump-plus-flap-press is the honest read of "something arrived.")
 * Base geometry: Lucide `mail` (ISC).
 */
const DUR = 0.9

export function MailIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mail'}
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
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <motion.path
          d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
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
    </svg>
  )
}

export const meta = {
  name: 'mail',
  gesture: 'you have got mail',
  family: 'secondary' as const,
  section: 'Communication',
  tags: ['email', 'envelope', 'message', 'inbox'],
}

export default MailIcon
