import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import type { Bezier } from '../core/easings'
import { easeInOutCubic } from '../core/easings'

/**
 * Server cog — it does what it means. VARIANT(server/database): the two
 * LEDs hard-blink exactly as in server.tsx, while the cog accent turns —
 * a wind-up then a drive, released back to rest rather than free-landed,
 * since the compound tooth paths don't give a confident fold-symmetry to
 * land on.
 * Base geometry: Lucide `server-cog` (ISC).
 */
const DUR = 1.0
const OVERSHOOT_TURN: Bezier = [0.5, 0, 0.3, 1.15]

export function ServerCogIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'server cog'}
      {...hoverProps}
    >
      <path d="M4.5 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-.5" />
      <path d="M4.5 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-.5" />
      <motion.line
        x1="6" x2="6.01" y1="6" y2="6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.08, 0.09, 0.2, 0.21, 0.32, 0.33, 0.44, 0.45, 0.55],
              ease: 'linear',
            },
          },
        }}
      />
      <motion.line
        x1="6" x2="6.01" y1="18" y2="18"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1],
            transition: { duration: DUR, times: [0, 0.62, 0.63, 0.76, 0.77, 1], ease: 'linear' },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12.1px 12.4px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 22, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.6, 1], ease: [easeInOutCubic, OVERSHOOT_TURN, easeInOutCubic] },
          },
        }}
      >
        <path d="m10.852 14.772-.383.923" />
        <path d="M13.148 14.772a3 3 0 1 0-2.296-5.544l-.383-.923" />
        <path d="m13.148 9.228.383-.923" />
        <path d="m13.53 15.696-.382-.924a3 3 0 1 1-2.296-5.544" />
        <path d="m14.772 10.852.923-.383" />
        <path d="m14.772 13.148.923.383" />
        <path d="m9.228 10.852-.923-.383" />
        <path d="m9.228 13.148-.923.383" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'server-cog',
  gesture: 'it does what it means',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['data', 'infra', 'server', 'cog'],
}

export default ServerCogIcon
