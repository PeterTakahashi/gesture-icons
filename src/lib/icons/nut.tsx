import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint } from '../core/easings'

/**
 * Nut — it threads on. A hex nut is 6-fold symmetric, so a 60° turn is a
 * free landing — visually identical to rest. It turns in two ratchet
 * clicks (a small counter wind-up, a first click, a dip as the wrench
 * resets, a second click home) rather than one smooth spin, the way a
 * hand actually tightens one.
 * Base geometry: Lucide `nut` (ISC).
 */
const DUR = 1.0

export function NutIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'nut'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 30, 22, 60],
            transition: {
              duration: DUR,
              times: [0, 0.15, 0.42, 0.58, 0.85],
              ease: [easeInOutCubic, [0.5, 0, 0.3, 1.1], easeInOutCubic, easeOutQuint],
            },
          },
        }}
      >
        <path d="M12 4V2" />
        <path d="M5 10v4a7.004 7.004 0 0 0 5.277 6.787c.412.104.802.292 1.102.592L12 22l.621-.621c.3-.3.69-.488 1.102-.592A7.003 7.003 0 0 0 19 14v-4" />
        <path d="M12 4C8 4 4.5 6 4 8c-.243.97-.919 1.952-2 3 1.31-.082 1.972-.29 3-1 .54.92.982 1.356 2 2 1.452-.647 1.954-1.098 2.5-2 .595.995 1.151 1.427 2.5 2 1.31-.621 1.862-1.058 2.5-2 .629.977 1.162 1.423 2.5 2 1.209-.548 1.68-.967 2-2 1.032.916 1.683 1.157 3 1-1.297-1.036-1.758-2.03-2-3-.5-2-4-4-8-4Z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'nut',
  gesture: 'it threads on',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['hardware', 'bolt', 'nut'],
}

export default NutIcon
