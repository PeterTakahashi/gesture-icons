import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Hard drive — it spins up. The chassis hums with a tiny, fast seek judder
 * while the activity LED hard-blinks three times — a drive waking up and
 * looking for data, not a light fading in and out.
 * Base geometry: Lucide `hard-drive` (ISC).
 */
const DUR = 0.9

export function HardDriveIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hard drive'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.4, -0.3, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.55, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        <path d="M21.946 12.013H2.054" />
        <path d="M10 16h.01" />
        {/* activity LED — hard blink, never a fade */}
        <motion.path
          d="M6 16h.01"
          initial="normal"
          animate={controls}
          variants={{
            normal: { opacity: 1 },
            animate: {
              opacity: [1, 0, 1, 0, 1, 0, 1, 1],
              transition: { duration: DUR, times: [0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.48, 1], ease: 'linear' },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'hard-drive',
  gesture: 'it spins up',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['disk', 'storage', 'data'],
}

export default HardDriveIcon
