import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cherry — they swing on the stem. Both cherries hang from the same shared
 * stalk peak and swing about it, one lagging the other by 4% — a pair on
 * one stalk, never perfectly in sync. The stems and leaf stay put; they're
 * the rigid stalk the fruit swings from.
 * Base geometry: Lucide `cherry` (ISC).
 */
const DUR = 1.0

export function CherryIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cherry'}
      {...hoverProps}
    >
      <path d="M7 14c3.22-2.91 4.29-8.75 5-12 1.66 2.38 4.94 9 5 12" />
      <path d="M22 9c-4.29 0-7.14-2.33-10-7 5.71 0 10 4.67 10 7Z" />
      <motion.path
        d="M2 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 6, -3, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M12 17a5 5 0 0 0 10 0c0-2.76-2.5-5-5-3-2.5-2-5 .24-5 3Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 6, -3, 0],
            transition: { duration: DUR, delay: DUR * 0.04, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cherry',
  gesture: 'they swing on the stem',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['fruit'],
}

export default CherryIcon
