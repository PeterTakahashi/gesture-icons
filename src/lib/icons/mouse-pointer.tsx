import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Mouse pointer — it does what it means. The whole cursor NUDGEs down-right
 * fast, hits a hard stop, and settles back — one click.
 * Base geometry: Lucide `mouse-pointer` (ISC).
 */
const DUR = 0.7
const D = 0.7071
const DRIVE = 1.2
const WIND = 0.3

export function MousePointerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mouse pointer'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -WIND * D, DRIVE * D, DRIVE * D, 0],
            y: [0, -WIND * D, DRIVE * D, DRIVE * D, 0],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.32, 0.5, 0.85],
              ease: [easeInOutCubic, easeOutQuart, 'linear', settleBack],
            },
          },
        }}
      >
        <path d="M12.586 12.586 19 19" />
        <path d="M3.688 3.037a.497.497 0 0 0-.651.651l6.5 15.999a.501.501 0 0 0 .947-.062l1.569-6.083a2 2 0 0 1 1.448-1.479l6.124-1.579a.5.5 0 0 0 .063-.947z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'mouse-pointer',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['cursor', 'click', 'pointer', 'mouse'],
}

export default MousePointerIcon
