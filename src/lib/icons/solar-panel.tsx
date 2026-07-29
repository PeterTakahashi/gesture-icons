import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Solar panel — it drinks the sun. The panel face and its front strut tilt
 * up toward the sky about the mount, hold there charging, and settle back;
 * one of the sun's rays gives a hard binary flick — never a fade — right at
 * the peak of the tilt. The post and the other rays hold still.
 * Base geometry: Lucide `solar-panel` (ISC).
 */
const DUR = 1.1

export function SolarPanelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'solar panel'}
      {...hoverProps}
    >
      <motion.path
        d="M11 2h2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 1, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.33, 0.36, 1], ease: 'linear' },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '8px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -5, -5, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m14.28 14-4.56 8" />
        <path d="M6.245 15.04A2 2 0 0 1 8 14h12a1 1 0 0 1 .864 1.505l-3.11 5.457A2 2 0 0 1 16 22H4a1 1 0 0 1-.863-1.506z" />
      </motion.g>
      <path d="m21 22-1.558-4H4.558" />
      <path d="M3 10v2" />
      <path d="M7 2a4 4 0 0 1-4 4" />
      <path d="m8.66 7.66 1.41 1.41" />
    </svg>
  )
}

export const meta = {
  name: 'solar-panel',
  gesture: 'it drinks the sun',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['energy', 'green', 'power', 'solar', 'panel'],
}

export default SolarPanelIcon
