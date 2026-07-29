import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Binoculars — they scan the horizon. The whole pair pans about the bridge
 * between the barrels, drifting a touch sideways as it goes, then levels
 * out — something out there was worth a second look.
 * Base geometry: Lucide `binoculars` (ISC).
 */
const DUR = 1.1

export function BinocularsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'binoculars'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0 },
          animate: {
            rotate: [0, -5, 4, 0],
            x: [0, -1.2, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.38, 0.72, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M10 10h4" />
        <path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3" />
        <path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z" />
        <path d="M 22 16 L 2 16" />
        <path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z" />
        <path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'binoculars',
  gesture: 'they scan the horizon',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['search', 'watch', 'explore', 'binoculars'],
}

export default BinocularsIcon
