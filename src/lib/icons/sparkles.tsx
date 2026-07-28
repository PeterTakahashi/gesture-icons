import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuint, settleBack } from '../core/easings'

/**
 * Sparkles — they shimmer. The big spark gathers and blooms like the star
 * (smaller here), landing on a 180° turn — the shape is point-symmetric,
 * so the reset is invisible. The two small sparkles trade places: one
 * implodes as the other blooms, then both settle back to their own size.
 * Base geometry: Lucide `sparkles` (ISC).
 */
const DUR = 0.9

export function SparklesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sparkles'}
      {...hoverProps}
    >
      <motion.path
        d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"
        style={{ transformBox: 'view-box', transformOrigin: '14px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.78, 1.08, 1],
            rotate: [0, -8, 14, 180],
            transition: {
              duration: DUR,
              times: [0, 0.32, 0.64, 1],
              ease: [[0.55, 0, 0.7, 0.3], easeOutQuint, settleBack],
            },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '20px 4px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.34, 0.62, 0.88], ease: [easeOutQuint, settleBack, easeOutQuint] },
          },
        }}
      >
        <path d="M20 2v4" />
        <path d="M22 4h-4" />
      </motion.g>
      <motion.circle
        cx="4" cy="20" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.3, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.34, 0.62, 0.88], ease: [easeOutQuint, settleBack, easeOutQuint] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'sparkles',
  gesture: 'they shimmer',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['magic', 'shine', 'new', 'ai'],
}

export default SparklesIcon
