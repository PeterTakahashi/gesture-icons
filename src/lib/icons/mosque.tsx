import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { settleBack } from '../core/easings'

/**
 * Mosque — the call sounds. The crescent and the finial pole beneath it —
 * the two small marks at the top of the minaret — pop in sequence, a beat
 * apart, the way the call to prayer marks the hour. The dome and the rest
 * of the building never move.
 * Base geometry: Lucide `mosque` (ISC).
 */
const DUR = 0.8

export function MosqueIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const pop = (delay: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 1.15, 1],
      transition: { duration: DUR, delay, times: [0, 0.4, 1], ease: settleBack },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mosque'}
      {...hoverProps}
    >
      <motion.path
        d="M12.268 2a2 2 0 003.465 2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={pop(0)}
      />
      <motion.path
        d="M14 5 L14 8"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={pop(0.1)}
      />
      <path d="M16 22v-3a2 2 0 00-4 0v3" />
      <path d="M21 13c-.662-1.497-1.666-2.753-2.9-3.63C16.825 8.47 15.422 8 14 8s-2.826.47-4.1 1.37C8.668 10.248 7.663 11.504 7 13z" />
      <path d="M3 9h4" />
      <path d="M7 22V6a5 5 0 00-2-4 5 5 0 00-2 4v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
    </svg>
  )
}

export const meta = {
  name: 'mosque',
  gesture: 'the call sounds',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['faith', 'minaret', 'mosque'],
}

export default MosqueIcon
