import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Shell — the tide turns it. It rocks about the point where it rests on the
 * sand — surf passing under it, not the shell moving on its own.
 * Base geometry: Lucide `shell` (ISC).
 */
const DUR = 1.1

export function ShellIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shell'}
      {...hoverProps}
    >
      <motion.path
        d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 4, -2, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.6, 0.82, 1], ease: [easeInOutCubic, easeInOutCubic, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'shell',
  gesture: 'the tide turns it',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['beach', 'sea'],
}

export default ShellIcon
