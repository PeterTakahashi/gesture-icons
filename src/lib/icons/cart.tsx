import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutExpo } from '../core/easings'

/**
 * Cart — it is pushed. A small draw-back (you load your weight before a
 * push), then the shove forward with a slight tip over the front wheels,
 * and it rolls back to rest. Speed lines stream on behind it while it
 * moves — drawn by dash length, never faded — and are gone at rest.
 * Base geometry: Lucide `shopping-cart` (ISC).
 */
const DUR = 1.0

export function CartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cart'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, rotate: 0 },
          animate: {
            x: [0, -1.4, 2.6, 0],
            rotate: [0, 0.5, -2.5, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.52, 1], ease: [easeInOutCubic, [0.5, 0, 0.2, 1.15], easeInOutCubic] },
          },
        }}
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </motion.g>
      {/* speed lines: written on by length while the cart moves, erased after */}
      {[{ d: 'M1 9.5h3.2', delay: 0 }, { d: 'M0.5 13h2.6', delay: 0.05 }].map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          strokeWidth={strokeWidth * 0.75}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 0.001, opacity: 0 },
            animate: {
              // opacity switches only while the length is ~0 — the line itself
              // is always drawn by dash length, and the round caps never park
              // a dot on screen
              pathLength: [0.001, 0.001, 1, 1, 0.001, 0.001],
              opacity: [0, 0, 1, 1, 0, 0],
              transition: {
                duration: DUR,
                delay: l.delay,
                pathLength: { times: [0, 0.22, 0.4, 0.6, 0.78, 1], ease: ['linear', easeOutExpo, 'linear', easeInOutCubic, 'linear'] },
                opacity: { times: [0, 0.21, 0.22, 0.78, 0.79, 1], ease: 'linear' },
              },
            },
          }}
        />
      ))}
    </svg>
  )
}
