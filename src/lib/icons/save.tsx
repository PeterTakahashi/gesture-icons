import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Save — it clicks in. The whole disk takes a button press: a short squash
 * about its center with a tiny downward give, then an overshoot release back
 * to rest. The inner shutter — the part that actually moves on a floppy
 * disk — slides sideways during the press, the one bit of real mechanism.
 * Base geometry: Lucide `save` (ISC).
 */
const DUR = 0.75

export function SaveIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'save'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, y: 0 },
          animate: {
            scale: [1, 0.94, 1.02, 1],
            y: [0, 0.8, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.6, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
        {/* the shutter — the one part of a floppy that actually slides */}
        <motion.path
          d="M7 3v4a1 1 0 0 0 1 1h7"
          initial="normal"
          animate={controls}
          variants={{
            normal: { x: 0 },
            animate: {
              x: [0, 1.4, 0],
              transition: { duration: DUR, times: [0, 0.35, 0.7], ease: [easeInCubic, settleBack] },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'save',
  gesture: 'it clicks in',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['disk', 'floppy', 'store'],
}

export default SaveIcon
