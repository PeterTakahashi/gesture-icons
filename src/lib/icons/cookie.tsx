import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Cookie — a bite is taken. The cookie shakes once, fast and decaying, and
 * each chocolate-chip dot pops and resettles a beat after, staggered —
 * crumbs jostling loose from the bite.
 * Base geometry: Lucide `cookie` (ISC).
 */
const SHAKE_DUR = 0.5
const CHIP_DUR = 0.5
const CHIPS: [number, number][] = [
  [8.5, 8.5],
  [16, 15.5],
  [12, 12],
  [11, 17],
  [7, 14],
]

export function CookieIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const pop = (delay: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.7, 1.2, 1],
      transition: { duration: CHIP_DUR, delay, times: [0, 0.3, 0.65, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cookie'}
      {...hoverProps}
    >
      <motion.path
        d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 3, -2, 1, 0],
            transition: { duration: SHAKE_DUR, times: [0, 0.3, 0.58, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      />
      {CHIPS.map(([cx, cy], i) => (
        <motion.path
          key={`${cx}-${cy}`}
          d={`M${cx} ${cy}v.01`}
          style={{ transformBox: 'view-box', transformOrigin: `${cx}px ${cy}px` }}
          initial="normal"
          animate={controls}
          variants={pop(0.1 + i * 0.06)}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'cookie',
  gesture: 'a bite is taken',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['snack', 'sweet'],
}

export default CookieIcon
