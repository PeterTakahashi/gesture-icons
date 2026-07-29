import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * QR code — it signals. The three finder squares hold — they are the fixed
 * reference a scanner locks onto. The data modules hard-BLINK in three
 * groups, left to right, equal-times steps, then all go steady — being
 * read by a laser, not a human. Same mechanic as barcode.tsx.
 * Base geometry: Lucide `qr-code` (ISC).
 */
const DUR = 0.55
const GROUPS = [
  ['M3 12h.01', 'M12 7v3a2 2 0 0 1-2 2H7', 'M12 3h.01'],
  ['M12 16v.01', 'M12 21v-1', 'M16 12h1'],
  ['M21 16h-3a2 2 0 0 0-2 2v3', 'M21 21v.01', 'M21 12v.01'],
]

export function QrCodeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'qr code'}
      {...hoverProps}
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      {GROUPS.map((group, gi) =>
        group.map((d) => (
          <motion.path
            key={d}
            d={d}
            initial="normal"
            animate={controls}
            variants={{
              normal: { opacity: 1 },
              animate: {
                opacity: [1, 1, 0, 0, 1, 1],
                transition: {
                  duration: DUR,
                  delay: gi * 0.18,
                  times: [0, 0.25, 0.3, 0.75, 0.8, 1],
                  ease: 'linear',
                },
              },
            }}
          />
        )),
      )}
    </svg>
  )
}

export const meta = {
  name: 'qr-code',
  gesture: 'it signals',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['code', 'scan'],
}

export default QrCodeIcon
