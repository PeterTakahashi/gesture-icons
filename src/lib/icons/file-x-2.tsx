import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * File X 2 — it draws itself. VARIANT(file-text): the X shakes "no" about
 * its own center (17.5px, 19.5px), the same decaying beat as file-x.tsx;
 * per this entry's spec the page also takes a small dip right on the shake's
 * peak (file-x.tsx's page holds fully still — here the spec asks for the
 * reaction, so the two variants read slightly differently on purpose).
 * Base geometry: Lucide `file-x-2` (ISC).
 */
const DUR = 0.85

export function FileX2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file x 2'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.36, 0.5, 0.7, 1], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="M11 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17.5px 19.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 3, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m15 17 5 5" />
        <path d="m20 17-5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-x-2',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document'],
}

export default FileX2Icon
