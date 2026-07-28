import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Antenna — it catches the wave. The mast shakes once as if struck by wind,
 * then a small dot pops above the fan of tips — signal acquired — and
 * collapses back out of sight, since Lucide's glyph never drew it: it must
 * rest hidden and end hidden, same as the typing dots in `chat.tsx`.
 * Base geometry: Lucide `antenna` (ISC).
 */
const DUR = 0.9

export function AntennaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const fill = color === 'currentColor' ? 'currentColor' : color
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'antenna'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.14, 0.3, 0.46, 0.58], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M2 12 7 2" />
        <path d="m7 12 5-10" />
        <path d="m12 12 5-10" />
        <path d="m17 12 5-10" />
        <path d="M4.5 7h15" />
        <path d="M12 16v6" />
      </motion.g>
      <motion.circle
        cx="14.5" cy="1" r="1.1"
        fill={fill} stroke="none"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 0.001 },
          animate: {
            scale: [0.001, 1.4, 1, 1, 0.001],
            transition: {
              duration: DUR,
              delay: 0.1,
              times: [0, 0.36, 0.5, 0.78, 0.92],
              ease: [settleBack, easeInOutCubic, 'linear', easeInOutCubic],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'antenna',
  gesture: 'it catches the wave',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['signal', 'broadcast'],
}

export default AntennaIcon
