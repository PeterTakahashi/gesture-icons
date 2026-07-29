import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Printer X — it is refused. The X shakes "no" — a decaying rotation about
 * its own center — while the printer body holds completely still; the
 * refusal belongs to the mark, not the machine.
 * Base geometry: Lucide `printer-x` (ISC).
 */
const DUR = 0.85

export function PrinterXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'printer x'}
      {...hoverProps}
    >
      <path d="M12.531 22H7a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h6.377" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.5" />
      <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 3, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m16.5 16.5 5 5" />
        <path d="m16.5 21.5 5-5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'printer-x',
  gesture: 'it is refused',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['cancel', 'remove', 'printer'],
}

export default PrinterXIcon
