import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Sun snow — both halves perform their own verb. The five sun-ray marks on
 * the right stretch outward along their own axis about their shared root,
 * staggered, exactly the language of sun.tsx; the snowflake cluster on the
 * left — the accent that reads as "snow" — gives one glinting breath as a
 * single unit, the honest verb for a fixed crystal that cannot spin without
 * losing its shape.
 * Base geometry: Lucide `sun-snow` (ISC).
 */
const DUR = 1.0

const RAYS = [
  { d: 'm14 20 1.25-2.5L18 18', delay: 0 },
  { d: 'm14 4 1.25 2.5L18 6', delay: 0.03 },
  { d: 'm17 21-3-6 1.5-3H22', delay: 0.06 },
  { d: 'm17 3-3 6 1.5 3', delay: 0.09 },
  { d: 'm20 10-1.5 2 1.5 2', delay: 0.12 },
]

export function SunSnowIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sun snow'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.16, 1],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M10 21v-1" />
        <path d="M10 4V3" />
        <path d="M10 9a3 3 0 0 0 0 6" />
        <path d="M2 12h1" />
        <path d="m3.64 18.36.7-.7" />
        <path d="m4.34 6.34-.7-.7" />
      </motion.g>
      {RAYS.map((ray) => (
        <motion.path
          key={ray.d}
          d={ray.d}
          style={{ transformBox: 'view-box', transformOrigin: '18px 12px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1.3, 1],
              transition: { duration: DUR, delay: ray.delay, times: [0, 0.4, 1], ease: [easeOutQuart, easeInOutCubic] },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'sun-snow',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'sun', 'snow'],
}

export default SunSnowIcon
