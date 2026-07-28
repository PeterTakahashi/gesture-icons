import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Paintbrush — like brush, but snappier: a quicker flick of the wrist
 * about the ferrule tip, with an extra small correction wobble before
 * it settles.
 * Base geometry: Lucide `paintbrush` (ISC).
 */
const DUR = 0.8

export function PaintbrushIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'paintbrush'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 7, -3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.48, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m14.622 17.897-10.68-2.913" />
        <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
        <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'paintbrush',
  gesture: 'it flicks paint',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['paint', 'art', 'decorate'],
}

export default PaintbrushIcon
