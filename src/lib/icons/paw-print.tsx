import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack } from '../core/easings'

/**
 * Paw print — the trail continues. The three toe pads press in sequence,
 * 50ms apart, then the main pad presses last — the order a paw actually
 * lands, toes first, weight settling onto the pad.
 * Base geometry: Lucide `paw-print` (ISC).
 */
const DUR = 0.8

export function PawPrintIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const press = (delay: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.8, 1.15, 1],
      transition: { duration: DUR, delay, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'paw print'}
      {...hoverProps}
    >
      <motion.circle cx="11" cy="4" r="2" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial="normal" animate={controls} variants={press(0)} />
      <motion.circle cx="18" cy="8" r="2" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial="normal" animate={controls} variants={press(0.05)} />
      <motion.circle cx="20" cy="16" r="2" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} initial="normal" animate={controls} variants={press(0.1)} />
      <motion.path
        d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={press(0.15)}
      />
    </svg>
  )
}

export const meta = {
  name: 'paw-print',
  gesture: 'the trail continues',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['pet', 'track', 'animal', 'paw', 'print'],
}

export default PawPrintIcon
