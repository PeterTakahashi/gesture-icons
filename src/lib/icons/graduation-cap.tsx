import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Graduation cap — it is tossed. The mortarboard and its tassel leave the
 * frame together (ease-in, genuinely gone past the top edge), are
 * repositioned while off-frame, and arrive back with a small landing dip —
 * the head-band they set down onto never moves, it's the ground they land
 * on. Once seated, the tassel keeps swinging a beat longer, lagging behind
 * the cap the way a hanging thing always does.
 * Base geometry: Lucide `graduation-cap` (ISC).
 */
const DUR = 1.2

export function GraduationCapIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'graduation cap'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -30, -30, 30, 30, 1.2, -0.3, 0],
            transition: {
              duration: DUR,
              times: [0, 0.24, 0.42, 0.42, 0.5, 0.86, 0.94, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart, easeInOutCubic, easeOutQuart],
            },
          },
        }}
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <motion.path
          d="M22 10v6"
          style={{ transformBox: 'view-box', transformOrigin: '22px 10px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, 0, 8, -6, 3.5, -1.5, 0],
              transition: {
                duration: DUR,
                times: [0, 0.82, 0.87, 0.91, 0.95, 0.98, 1],
                ease: ['linear', easeOutQuart, easeInOutCubic, easeInOutCubic, easeInOutCubic, easeOutQuart],
              },
            },
          }}
        />
      </motion.g>
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  )
}

export const meta = {
  name: 'graduation-cap',
  gesture: 'it is tossed',
  family: 'travel' as const,
  section: 'People & emotion',
  tags: ['education', 'graduate', 'achievement'],
}

export default GraduationCapIcon
