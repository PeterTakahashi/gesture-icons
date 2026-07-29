import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Star plus — one more is added. The plus dips to almost nothing and pops
 * back past its own size before settling, and the star body takes a small
 * y dip exactly on that pop frame — a new favorite landing. Everything
 * else on the glyph holds still.
 * Base geometry: Lucide `star-plus` (ISC).
 */
const DUR = 1.0

export function StarPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'star plus'}
      {...hoverProps}
    >
      <motion.path
        d="M11.013 18.582 6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904L20 11.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.55, 0.62], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.6, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M15 18h6" />
        <path d="M18 15v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'star-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['add', 'new', 'star', 'plus'],
}

export default StarPlusIcon
