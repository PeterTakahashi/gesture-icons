import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Octagon pause — hold everything. VARIANT(pause): the two bars squeeze
 * toward each other and hold the squeeze — the same language as the bare
 * pause glyph — while the octagon itself, the formal authority making the
 * call, never moves.
 * Base geometry: Lucide `octagon-pause` (ISC).
 */
const DUR = 0.85

export function OctagonPauseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const bar = (dir: 1 | -1): Variants => ({
    normal: { x: 0 },
    animate: {
      x: [0, 0.9 * dir, 0.9 * dir, 0],
      transition: { duration: DUR, times: [0, 0.3, 0.6, 1], ease: [easeInOutCubic, 'linear', easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'octagon pause'}
      {...hoverProps}
    >
      <motion.path
        d="M10 15V9"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={bar(1)}
      />
      <motion.path
        d="M14 15V9"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={bar(-1)}
      />
      <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
    </svg>
  )
}

export const meta = {
  name: 'octagon-pause',
  gesture: 'hold everything',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['stop', 'pause', 'octagon'],
}

export default OctagonPauseIcon
