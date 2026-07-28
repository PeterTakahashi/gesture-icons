import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Siren — it sounds. The dome shakes fast and small while the light rays
 * around its top flick — erase then pen-redraw at speed — together reading
 * as one whoop. The base and the dome's center seam never move.
 * Spec named "two small burst lines"; the actual glyph carries five ray
 * marks ringing the dome, so all five flick together as one burst — adapted
 * to the real geometry per the family rule (keep the verb, fit the shape).
 * Base geometry: Lucide `siren` (ISC).
 */
const DUR = 0.6
const RAY_STEP = 0.03

const RAYS = [
  'M12 2v1',
  'M18.5 4.5 18 5',
  'M21 12h1',
  'm4.929 4.929.707.707',
  'M2 12h1',
]

export function SirenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const ray = (i: number): Variants => {
    const start = i * RAY_STEP
    return {
      normal: { pathLength: 1 },
      animate: {
        pathLength: [1, 0.001, 0.001, 1],
        transition: {
          duration: DUR,
          times: [0, 0.15 + start, 0.3 + start, 0.6 + start],
          ease: [easeInCubic, 'linear', pen],
        },
      },
    }
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'siren'}
      {...hoverProps}
    >
      <path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z" />
      <path d="M12 12v6" />
      <motion.path
        d="M7 18v-6a5 5 0 1 1 10 0v6"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.45, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      />
      {RAYS.map((d, i) => (
        <motion.path key={d} d={d} initial="normal" animate={controls} variants={ray(i)} />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'siren',
  gesture: 'it sounds',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['alarm', 'emergency'],
}

export default SirenIcon
