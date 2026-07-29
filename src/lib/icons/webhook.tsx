import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Webhook — it wires itself up. The three hook arms erase then pen-redraw
 * in sequence, each starting before the last one finishes, so the chain
 * reads as being linked together rather than three lines appearing at once.
 * Base geometry: Lucide `webhook` (ISC).
 */
const SEG = 0.55
const STAGGER = 0.3

const link = (delay: number): Variants => ({
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.001, 0.001, 1],
    transition: { duration: SEG, delay, times: [0, 0.25, 0.4, 0.85], ease: [easeInCubic, 'linear', pen] },
  },
})

export function WebhookIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'webhook'}
      {...hoverProps}
    >
      <motion.path
        d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"
        initial="normal" animate={controls} variants={link(0)}
      />
      <motion.path
        d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"
        initial="normal" animate={controls} variants={link(STAGGER)}
      />
      <motion.path
        d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"
        initial="normal" animate={controls} variants={link(2 * STAGGER)}
      />
    </svg>
  )
}

export const meta = {
  name: 'webhook',
  gesture: 'it wires itself up',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['nodes', 'structure', 'webhook'],
}

export default WebhookIcon
