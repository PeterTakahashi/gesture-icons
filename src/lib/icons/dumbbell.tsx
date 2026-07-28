import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Dumbbell — one more rep. The whole bar is lifted with visible effort (a
 * slow, deliberate rise, not a snap), held at the top under strain, then
 * lowered under control into a heavy landing dip — the rep counted, not
 * dropped.
 * Base geometry: Lucide `dumbbell` (ISC).
 */
const DUR = 1.3

export function DumbbellIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'dumbbell'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2.5, -2.5, 0.8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.35, 0.6, 0.8, 1],
              ease: [easeInOutCubic, 'linear', easeInCubic, easeOutQuart],
            },
          },
        }}
      >
        <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
        <path d="m2.5 21.5 1.4-1.4" />
        <path d="m20.1 3.9 1.4-1.4" />
        <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
        <path d="m9.6 14.4 4.8-4.8" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'dumbbell',
  gesture: 'one more rep',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['gym', 'fitness', 'weights'],
}

export default DumbbellIcon
