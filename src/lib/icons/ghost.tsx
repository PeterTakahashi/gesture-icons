import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Ghost — it says boo. The body billows up and settles, a scaleY breath
 * anchored at the crown standing in for the hem's wobble (the scalloped
 * hem is fused into the same outline path as the body, so it cannot ripple
 * on its own — this is the honest substitute: the whole silhouette gives a
 * little on the way down, same as cloth settling). The eyes widen on the
 * rise, then shrink back bashful.
 * Base geometry: Lucide `ghost` (ISC).
 */
const DUR = 1.15

export function GhostIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ghost'}
      {...hoverProps}
    >
      <motion.path
        d="M12 2a8 8 0 0 0-8 8v12l3-3 2.5 2.5L12 19l2.5 2.5L17 19l3 3V10a8 8 0 0 0-8-8z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, scaleY: 1 },
          animate: {
            y: [0, -1.5, 0.3, 0],
            scaleY: [1, 1, 1.06, 1],
            transition: {
              duration: DUR,
              y: { times: [0, 0.35, 0.7, 1], ease: [easeOutQuart, gravity, easeOutQuart] },
              scaleY: { times: [0, 0.5, 0.75, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
            },
          },
        }}
      />
      <motion.path
        d="M9 10h.01"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.15, 0.4, 0.7], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M15 10h.01"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.15, 0.4, 0.7], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'ghost',
  gesture: 'it says boo',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['spooky', 'halloween', 'fun'],
}

export default GhostIcon
