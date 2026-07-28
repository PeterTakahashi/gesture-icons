import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack } from '../core/easings'

/**
 * TV — it switches on. The screen rect does one quick scaleY about its own
 * center-line, an old tube blinking to life before it holds its picture.
 * The antenna above stays put — it isn't what turns on.
 * Base geometry: Lucide `tv` (ISC).
 */
const DUR = 0.55

export function TvIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tv'}
      {...hoverProps}
    >
      <path d="m17 2-5 5-5-5" />
      <motion.rect
        width="20" height="15" x="2" y="7" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 14.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 0.92, 1.02, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.66, 1], ease: [easeInCubic, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'tv',
  gesture: 'it switches on',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['television', 'screen'],
}

export default TvIcon
