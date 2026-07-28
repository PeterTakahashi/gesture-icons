import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Fingerprint — it reads the print. Every ridge erases together on the same
 * beat, then the pen redraws them center-outward, staggered so the scan
 * reads as one pass sweeping from the print's core to its edges rather than
 * nine lines flickering at once.
 * Base geometry: Lucide `fingerprint` (ISC).
 */
const DUR = 1.3
const ERASE_END = 0.18
const REDRAW_LEN = 0.35
const REDRAW_START = 0.24
const STEP = 0.033 // ~40ms of a 1.3s clock

// ordered center-outward: innermost ridge first, outer arcs next, the
// small terminal flicks at each ridge's outer tip drawn last
const RIDGES = [
  'M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4',
  'M9 6.8a6 6 0 0 1 9 5.2v2',
  'M14 13.12c0 2.38 0 6.38-1 8.88',
  'M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2',
  'M2 12a10 10 0 0 1 18-6',
  'M21.8 16c.2-2 .131-5.354 0-6',
  'M2 16h.01',
  'M17.29 21.02c.12-.6.43-2.3.5-3.02',
  'M8.65 22c.21-.66.45-1.32.57-2',
]

export function FingerprintIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const ridge = (i: number): Variants => {
    const redrawStart = REDRAW_START + i * STEP
    const redrawEnd = redrawStart + REDRAW_LEN
    return {
      normal: { pathLength: 1 },
      animate: {
        pathLength: [1, 0.001, 0.001, 1],
        transition: {
          duration: DUR,
          times: [0, ERASE_END, redrawStart, redrawEnd],
          ease: [easeInCubic, 'linear', pen],
        },
      },
    }
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fingerprint'}
      {...hoverProps}
    >
      {RIDGES.map((d, i) => (
        <motion.path key={d} d={d} initial="normal" animate={controls} variants={ridge(i)} />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'fingerprint',
  gesture: 'it reads the print',
  family: 'draw-on' as const,
  section: 'Security',
  tags: ['biometric', 'identity', 'touch'],
}

export default FingerprintIcon
