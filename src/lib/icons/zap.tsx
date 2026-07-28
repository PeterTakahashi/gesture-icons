import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Zap — it strikes. The bolt cuts to nothing for a dark instant, then slams
 * back past full size before settling — the strike itself — and the whole
 * mark takes a small downward jolt on the exact frame it lands, never
 * before it is "hit."
 * Base geometry: Lucide `zap` (ISC).
 */
const DUR = 0.75

export function ZapIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'zap'}
      {...hoverProps}
    >
      <motion.path
        d="M15.914 4a1.5 1.5 0 0 0-2.474-1.561l-9 9A1.5 1.5 0 0 0 5.5 14h4.002a.5.5 0 0 1 .471.666L8.086 20a1.5 1.5 0 0 0 2.475 1.56l9-9A1.5 1.5 0 0 0 18.5 10h-3.997a.5.5 0 0 1-.472-.667z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, y: 0 },
          animate: {
            scale: [1, 0.001, 0.001, 1.35, 1],
            y: [0, 0, 0, 0.5, 0],
            transition: {
              duration: DUR,
              scale: { times: [0, 0.08, 0.24, 0.42, 0.62], ease: [easeInCubic, 'linear', settleBack, easeOutQuart] },
              y: { times: [0, 0.42, 0.5, 0.58, 0.74], ease: ['linear', 'linear', easeOutQuart, easeOutQuart] },
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'zap',
  gesture: 'it strikes',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['lightning', 'energy', 'fast'],
}

export default ZapIcon
