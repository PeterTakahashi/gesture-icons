import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Tower control — cleared for takeoff. The tower body, legs and struts hold
 * still; only the beacon tip on top of the mast blinks, a true binary step
 * with no fade, twice, then steady on — traffic managed.
 * Base geometry: Lucide `tower-control` (ISC).
 */
const DUR = 1.0

export function TowerControlIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tower control'}
      {...hoverProps}
    >
      <path d="M18.2 12.27 20 6H4l1.8 6.27a1 1 0 0 0 .95.73h10.5a1 1 0 0 0 .96-.73Z" />
      <path d="M8 13v9" />
      <path d="M16 22v-9" />
      <path d="m9 6 1 7" />
      <path d="m15 6-1 7" />
      <path d="M12 6V2" />
      {/* beacon tip: a true binary blink, never a fade */}
      <motion.path
        d="M13 2h-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.09, 0.1, 0.22, 0.23, 0.35, 0.36, 0.48, 0.49, 0.55],
              ease: 'linear',
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'tower-control',
  gesture: 'cleared for takeoff',
  family: 'secondary' as const,
  section: 'Transport',
  tags: ['airport', 'atc', 'tower', 'control'],
}

export default TowerControlIcon
