import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Shovel — it digs in. A two-stage push down the blade's own axis (a foot
 * presses it in, pauses, presses again), then it levers back — a small
 * rotate about the blade tip — and comes home. One scoop.
 * Base geometry: Lucide `shovel` (ISC).
 */
const DUR = 1.0

export function ShovelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shovel'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            x: [0, -0.9, -0.9, -1.7, -1.7, 0],
            y: [0, 0.9, 0.9, 1.7, 1.7, 0],
            rotate: [0, 0, 0, 0, -6, 0],
            transition: {
              duration: DUR,
              times: [0, 0.3, 0.48, 0.66, 0.85, 1],
              ease: [easeInOutCubic, 'linear', easeInOutCubic, easeOutQuart, easeOutQuart],
            },
          },
        }}
      >
        <path d="M21.56 4.56a1.5 1.5 0 0 1 0 2.122l-.47.47a3 3 0 0 1-4.212-.03 3 3 0 0 1 0-4.243l.44-.44a1.5 1.5 0 0 1 2.121 0z" />
        <path d="M3 22a1 1 0 0 1-1-1v-3.586a1 1 0 0 1 .293-.707l3.355-3.355a1.205 1.205 0 0 1 1.704 0l3.296 3.296a1.205 1.205 0 0 1 0 1.704l-3.355 3.355a1 1 0 0 1-.707.293z" />
        <path d="m9 15 7.879-7.878" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'shovel',
  gesture: 'it digs in',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['dig', 'garden', 'tool'],
}

export default ShovelIcon
