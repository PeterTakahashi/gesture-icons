import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Fish — it swims a beat. The tail fin whips about the point it joins the
 * body, twice, decaying, while the whole fish nudges forward toward its
 * head — one swim stroke, then it drifts back to rest.
 * Base geometry: Lucide `fish` (ISC).
 */
const DUR = 0.9

export function FishIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fish'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
        <path d="M18 12v.5" />
        <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
        <motion.path
          d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33"
          style={{ transformBox: 'view-box', transformOrigin: '7px 12px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -6, 6, -3, 1.5, 0],
              transition: { duration: DUR, times: [0, 0.18, 0.4, 0.6, 0.8, 1], ease: easeInOutCubic },
            },
          }}
        />
        <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
        <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'fish',
  gesture: 'it swims a beat',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['seafood', 'animal'],
}

export default FishIcon
