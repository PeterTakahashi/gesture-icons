import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint } from '../core/easings'

/**
 * Tool case — it is latched shut. The folding handle closes about the top
 * edge of the case with a hard, no-overshoot stop, and the case itself dips
 * on the frame it lands, not before — then both return so the icon rests
 * exactly as Lucide drew it, ready to go again.
 * Base geometry: Lucide `tool-case` (ISC).
 */
const DUR = 0.85

export function ToolCaseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tool case'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 11px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -4, -4, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: [easeOutQuint, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M10 15h4" />
        <path d="m14.817 10.995-.971-1.45 1.034-1.232a2 2 0 0 0-2.025-3.238l-1.82.364L9.91 3.885a2 2 0 0 0-3.625.748L6.141 6.55l-1.725.426a2 2 0 0 0-.19 3.756l.657.27" />
        <path d="m18.822 10.995 2.26-5.38a1 1 0 0 0-.557-1.318L16.954 2.9a1 1 0 0 0-1.281.533l-.924 2.122" />
      </motion.g>
      <motion.path
        d="M4 12.006A1 1 0 0 1 4.994 11H19a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.46, 0.64, 1], ease: ['linear', easeOutQuint, easeInOutCubic, easeOutQuint] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'tool-case',
  gesture: 'it is latched shut',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['toolbox', 'kit', 'tool', 'case'],
}

export default ToolCaseIcon
