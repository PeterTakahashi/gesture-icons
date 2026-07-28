import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Briefcase — off to work. Lifted by the handle: the still-vertical grip
 * carries the whole assembly up, while the case swings below it — a small
 * decaying pendulum hinged at the grip — before it sets down flat.
 * Base geometry: Lucide `briefcase` (ISC).
 */
const DUR = 1.0

export function BriefcaseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'briefcase'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.8, -1.8, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.74, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <motion.rect
          width="20" height="14" x="2" y="6" rx="2"
          style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -4, 3, -1, 0],
              transition: { duration: DUR, times: [0, 0.3, 0.52, 0.74, 1], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'briefcase',
  gesture: 'off to work',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['work', 'business', 'job'],
}

export default BriefcaseIcon
