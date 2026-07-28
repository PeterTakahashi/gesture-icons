import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, gravity, easeOutQuart } from '../core/easings'

/**
 * Pickaxe — it strikes the seam. Like the axe: the head swings about the
 * grip end, gravity carries the downswing, a hard stop with a one-frame
 * jolt reads as the strike hitting rock.
 * Base geometry: Lucide `pickaxe` (ISC).
 */
const DUR = 0.75

export function PickaxeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pickaxe'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '2px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -15, 6, 0],
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.56, 1], ease: [easeInOutCubic, gravity, easeOutQuart] },
          },
        }}
      >
        <path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3L11 9.999" />
        <path d="M15.973 4.027A13 13 0 0 0 5.902 2.373c-1.398.342-1.092 2.158.277 2.601a19.9 19.9 0 0 1 5.822 3.024" />
        <path d="M16.001 11.999a19.9 19.9 0 0 1 3.024 5.824c.444 1.369 2.26 1.676 2.603.278A13 13 0 0 0 20 8.069" />
        <path d="M18.352 3.352a1.205 1.205 0 0 0-1.704 0l-5.296 5.296a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l5.296-5.296a1.205 1.205 0 0 0 0-1.704z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'pickaxe',
  gesture: 'it strikes the seam',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['mine', 'dig', 'tool'],
}

export default PickaxeIcon
