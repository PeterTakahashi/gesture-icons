import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * NFC — it taps to pay. All four arcs erase together on the same fast beat,
 * then redraw smallest (closest to the device) to largest, 80ms apart —
 * the handshake chirping outward, never a fade.
 * Base geometry: Lucide `nfc` (ISC).
 */
const DUR = 1.0

export function NfcIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const arc = (redrawStart: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        times: [0, 0.15, redrawStart, redrawEnd],
        ease: [easeInCubic, 'linear', easeOutQuart],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'nfc'}
      {...hoverProps}
    >
      <motion.path d="M6 8.32a7.43 7.43 0 0 1 0 7.36" initial="normal" animate={controls} variants={arc(0.22, 0.5)} />
      <motion.path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58" initial="normal" animate={controls} variants={arc(0.3, 0.58)} />
      <motion.path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8" initial="normal" animate={controls} variants={arc(0.38, 0.66)} />
      <motion.path d="M16.37 2a20.16 20.16 0 0 1 0 20" initial="normal" animate={controls} variants={arc(0.46, 0.74)} />
    </svg>
  )
}

export const meta = {
  name: 'nfc',
  gesture: 'it taps to pay',
  family: 'draw-on' as const,
  section: 'Devices',
  tags: ['contactless', 'payment', 'wireless', 'nfc'],
}

export default NfcIcon
