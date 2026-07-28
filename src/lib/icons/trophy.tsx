import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint, gravity } from '../core/easings'

/**
 * Trophy — it is hoisted. Lifted overhead with a proud tilting shake, then
 * set down with a firm landing dip — the ground line it rests on never
 * moves; only the cup, handles, and stem are held aloft.
 * Base geometry: Lucide `trophy` (ISC).
 */
const DUR = 1.15

export function TrophyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'trophy'}
      {...hoverProps}
    >
      <path d="M4 22h16" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -2.8, -2.8, 0.8, 0],
            rotate: [0, -4, 3, 0],
            transition: {
              duration: DUR,
              y: { times: [0, 0.24, 0.66, 0.9, 1], ease: [easeOutQuint, 'linear', gravity, easeOutQuart] },
              rotate: { times: [0, 0.3, 0.6, 0.9], ease: easeInOutCubic },
            },
          },
        }}
      >
        <path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2" />
        <path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2" />
        <path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3" />
        <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
        <path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'trophy',
  gesture: 'it is hoisted',
  family: 'rigid' as const,
  section: 'People',
  tags: ['win', 'champion', 'prize', 'first'],
}

export default TrophyIcon
