import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * File box — it draws itself. VARIANT(file-text): the page and its folded
 * corner hold still; the distinguishing parcel lifts clear, holds a beat,
 * then drops back with gravity — the page taking a small dip on the exact
 * frame the box lands, same handoff as file-check.tsx's tick.
 * Base geometry: Lucide `file-box` (ISC).
 */
const DUR = 1.0

export function FileBoxIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file box'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.74, 0.88, 1], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="M14 2v5a1 1 0 001 1h5" />
        <path d="M14.692 22H18a2 2 0 002-2V8a2.4 2.4 0 00-.706-1.706l-3.588-3.588A2.4 2.4 0 0014 2H6a2 2 0 00-2 2v3.804" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '7px 17.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2, -2, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 0.9], ease: [easeOutQuart, 'linear', gravity] },
          },
        }}
      >
        <path d="M2.264 13.752 7 16.5l4.737-2.748" />
        <path d="M2.995 13.014A2 2 0 002 14.744v3.516a2 2 0 00.996 1.73l3 1.74a2 2 0 002.008 0l3-1.74A2 2 0 0012 18.26v-3.517a2 2 0 00-.995-1.73l-3-1.742a2 2 0 00-1.892-.064z" />
        <path d="M7 16.5V22" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-box',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'box'],
}

export default FileBoxIcon
