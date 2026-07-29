import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * Earth lock — it is locked. VARIANT(lock): the mini shackle lifts clear,
 * holds a beat, and drops shut with the lock body taking the hit exactly on
 * the contact frame — the same beat as `lock.tsx`, scaled to the badge. The
 * earth's rim and continent lines never move; a planet doesn't react to a
 * padlock clicking shut on its corner.
 * Base geometry: Lucide `earth-lock` (ISC).
 */
const DUR = 1.0

export function EarthLockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'earth lock'}
      {...hoverProps}
    >
      <path d="M7 3.34V5a3 3 0 0 0 3 3" />
      <path d="M11 21.95V18a2 2 0 0 0-2-2 2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
      <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
      <path d="M12 2a10 10 0 1 0 9.54 13" />
      <motion.path
        d="M20 6V4a2 2 0 1 0-4 0v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.3, -1.3, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.8], ease: [easeOutQuart, 'linear', gravity] },
          },
        }}
      />
      <motion.rect
        width="8" height="5" x="14" y="6" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.78, 0.85, 1], ease: ['linear', 'linear', gravity, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'earth-lock',
  gesture: 'it is locked',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['secure', 'private', 'earth', 'lock'],
}

export default EarthLockIcon
