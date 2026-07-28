import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Bell — it rings. 鐘は鳴る、それだけ。
 * The whole bell swings about the loop it hangs from, each swing smaller than
 * the last; the clapper lags a beat behind because inertia arrives late.
 * Base geometry: Lucide `bell` (ISC).
 */
const DUR = 1.05

export function BellIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bell'}
      {...hoverProps}
    >
      {/* 吊り元 (12,3) を支点に全体が揺れる */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -13, 11, -7, 4, -2, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.54, 0.7, 0.86, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
        {/* clapper counter-swings, hinged where it meets the rim */}
        <motion.path
          d="M10.268 21a2 2 0 0 0 3.464 0"
          style={{ transformBox: 'view-box', transformOrigin: '12px 17.5px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, 10, -9, 6, -3, 1, 0],
              transition: { duration: DUR, times: [0, 0.2, 0.4, 0.58, 0.74, 0.88, 1], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}
