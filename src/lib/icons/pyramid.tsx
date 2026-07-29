import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Pyramid — it endures the ages. VARIANT(mountain): the near-stillness
 * gesture — a barely perceptible swell about its base — plus a single
 * glint tick at the apex, rest-hidden at scale 0.001, catching the light
 * once at the peak of the swell.
 * Base geometry: Lucide `pyramid` (ISC).
 */
const DUR = 1.5

export function PyramidIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const fillColor = color === 'currentColor' ? 'currentColor' : color
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pyramid'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.015, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M2.5 16.88a1 1 0 0 1-.32-1.43l9-13.02a1 1 0 0 1 1.64 0l9 13.01a1 1 0 0 1-.32 1.44l-8.51 4.86a2 2 0 0 1-1.98 0Z" />
        <path d="M12 2v20" />
      </motion.g>
      {/* a single glint at the apex, rest-hidden */}
      <motion.circle
        cx="12" cy="2.6" r="0.6" fill={fillColor} stroke="none"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 0.001 },
          animate: {
            scale: [0.001, 1, 0.001, 0.001],
            transition: { duration: DUR, times: [0, 0.45, 0.55, 1], ease: [settleBack, 'linear'] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'pyramid',
  gesture: 'it endures the ages',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['3d', 'egypt', 'geometry', 'pyramid'],
}

export default PyramidIcon
