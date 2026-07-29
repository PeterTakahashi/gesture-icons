import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack, easeOutQuart } from '../core/easings'

/**
 * Network — it draws itself. Everything vanishes for a beat, then the
 * connectors are rewritten in the order a hand would wire them: the
 * horizontal bar first, left to right (the left node popping as the pen
 * leaves it, the right node popping as the pen arrives), then the stem
 * grows up from that bar to the top node, which pops in last. Both paths'
 * own drawn directions already run this way, so no direction was reversed.
 * Base geometry: Lucide `network` (ISC).
 */
const DUR = 1.2

export function NetworkIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const nodeVariants = (popStart: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 1, 0.001, 0.001, 1.25, 1],
      transition: {
        duration: DUR,
        times: [0, 0.12, 0.24, popStart, popStart + 0.12, popStart + 0.22],
        ease: ['linear', easeInCubic, 'linear', settleBack, easeOutQuart],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'network'}
      {...hoverProps}
    >
      <motion.path
        d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.14, 0.26, 0.56], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.path
        d="M12 12V8"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.14, 0.26, 0.58, 0.86], ease: [easeInCubic, 'linear', 'linear', pen] },
          },
        }}
      />
      <motion.rect x="2" y="16" width="6" height="6" rx="1" initial="normal" animate={controls} variants={nodeVariants(0.26)} />
      <motion.rect x="16" y="16" width="6" height="6" rx="1" initial="normal" animate={controls} variants={nodeVariants(0.56)} />
      <motion.rect x="9" y="2" width="6" height="6" rx="1" initial="normal" animate={controls} variants={nodeVariants(0.86)} />
    </svg>
  )
}

export const meta = {
  name: 'network',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['nodes', 'structure', 'network'],
}

export default NetworkIcon
