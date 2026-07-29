import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Circle pile — this glyph has no enclosing ring (it is six coins scattered
 * into a pile), so the "still frame + inner verb" template doesn't literally
 * apply; the honest read is the pile itself settling. Each coin gets a small
 * landing bounce, cascading bottom row first, then the middle pair, then the
 * lone coin on top — the order a pile actually stacks in. Every coin stays
 * visible at rest (r=1 scale) since these are the whole glyph, not a hidden
 * secondary mark.
 * Base geometry: Lucide `circle-pile` (ISC).
 */
const DUR = 0.9
const STAGGER = 0.065 * DUR

const COINS = [
  { cx: 4, cy: 19, delay: 0 },
  { cx: 12, cy: 19, delay: STAGGER },
  { cx: 20, cy: 19, delay: STAGGER * 2 },
  { cx: 8, cy: 12, delay: STAGGER * 3 },
  { cx: 16, cy: 12, delay: STAGGER * 4 },
  { cx: 12, cy: 5, delay: STAGGER * 5 },
]

export function CirclePileIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'circle pile'}
      {...hoverProps}
    >
      {COINS.map((c) => (
        <motion.circle
          key={`${c.cx}-${c.cy}`}
          cx={c.cx} cy={c.cy} r="2"
          style={{ transformBox: 'view-box', transformOrigin: `${c.cx}px ${c.cy}px` }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 0.7, 1.25, 1],
              transition: {
                duration: DUR,
                delay: c.delay,
                times: [0, 0.3, 0.62, 1],
                ease: [easeInCubic, settleBack, easeOutQuart],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'circle-pile',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['circle', 'pile'],
}

export default CirclePileIcon
