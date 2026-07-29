import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Regex — it signals. The character-class box (left) and the asterisk glyph
 * (right) hard-BLINK in sequence, left to right, equal-times steps, then
 * both go steady — a laser reading the pattern, not a human. Same mechanic
 * as barcode.tsx.
 * Base geometry: Lucide `regex` (ISC).
 */
const DUR = 0.55
const GROUPS = [
  ['M9 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2z'],
  ['M17 3v10', 'm12.67 5.5 8.66 5', 'm12.67 10.5 8.66-5'],
]

export function RegexIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'regex'}
      {...hoverProps}
    >
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
                  delay: gi * 0.22,
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
  name: 'regex',
  gesture: 'it signals',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['code', 'scan', 'regex'],
}

export default RegexIcon
