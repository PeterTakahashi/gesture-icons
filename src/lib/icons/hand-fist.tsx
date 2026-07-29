import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Hand fist — it clenches. The whole fist compresses about its own center
 * and springs slightly past its rest size, with a small shake right at the
 * tightest point — the grip finding its resolve.
 * Base geometry: Lucide `hand-fist` (ISC).
 */
const DUR = 0.8

export function HandFistIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hand fist'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.94, 1.02, 1],
            rotate: [0, 0, -2, 2, -1, 0, 0],
            transition: {
              duration: DUR,
              scale: { times: [0, 0.32, 0.62, 1], ease: [easeInCubic, settleBack, easeInOutCubic] },
              rotate: { times: [0, 0.32, 0.4, 0.48, 0.56, 0.64, 1], ease: easeInOutCubic },
            },
          },
        }}
      >
        <path d="M12.035 17.012a3 3 0 0 0-3-3l-.311-.002a.72.72 0 0 1-.505-1.229l1.195-1.195A2 2 0 0 1 10.828 11H12a2 2 0 0 0 0-4H9.243a3 3 0 0 0-2.122.879l-2.707 2.707A4.83 4.83 0 0 0 3 14a8 8 0 0 0 8 8h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v2a2 2 0 1 0 4 0" />
        <path d="M13.888 9.662A2 2 0 0 0 17 8V5A2 2 0 1 0 13 5" />
        <path d="M9 5A2 2 0 1 0 5 5V10" />
        <path d="M9 7V4A2 2 0 1 1 13 4V7.268" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'hand-fist',
  gesture: 'it clenches',
  family: 'rigid' as const,
  section: 'Hands',
  tags: ['fist', 'power', 'solidarity', 'hand'],
}

export default HandFistIcon
