'use client'

import { motion } from 'framer-motion'

interface Props {
  passionDone: boolean
  missionDone: boolean
  vocationDone: boolean
  accentColor: string
}

const T = { duration: 0.9, ease: 'easeOut' }

export function IkigaiVenn({ passionDone, missionDone, vocationDone, accentColor }: Props) {
  const professionDone = passionDone && missionDone && vocationDone
  const allDone = professionDone

  // Geometry
  const vb = 360
  const cx = vb / 2   // 180
  const cy = vb / 2   // 180
  const r = 90
  const offset = 52   // distance each circle center is from origin

  const circles = [
    {
      cx: cx - offset, cy: cy - offset,
      done: passionDone,
      label: 'PASSION', sublabel: 'what you love',
      // label anchor: upper-left corner of this circle
      lx: cx - offset - 46, ly: cy - offset - 46,
      anchor: 'middle' as const,
    },
    {
      cx: cx + offset, cy: cy - offset,
      done: missionDone,
      label: 'MISSION', sublabel: 'what the world needs',
      lx: cx + offset + 46, ly: cy - offset - 46,
      anchor: 'middle' as const,
    },
    {
      cx: cx - offset, cy: cy + offset,
      done: vocationDone,
      label: 'VOCATION', sublabel: "what you're good at",
      lx: cx - offset - 46, ly: cy + offset + 46,
      anchor: 'middle' as const,
    },
    {
      cx: cx + offset, cy: cy + offset,
      done: professionDone,
      label: 'PROFESSION', sublabel: 'what pays',
      lx: cx + offset + 46, ly: cy + offset + 46,
      anchor: 'middle' as const,
    },
  ]

  return (
    <div className="flex flex-col items-center gap-3 py-4">
      <svg
        viewBox={`0 0 ${vb} ${vb}`}
        width="320"
        height="320"
        aria-hidden="true"
      >
        <defs>
          <filter id="dd-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dd-center-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="16" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Circle fills */}
        {circles.map(({ cx: ccx, cy: ccy, done, label }) => (
          <motion.circle
            key={label}
            cx={ccx} cy={ccy} r={r}
            fill={accentColor}
            animate={{ opacity: done ? 0.18 : 0.04, filter: done ? 'url(#dd-glow)' : 'none' }}
            transition={T}
          />
        ))}

        {/* Circle strokes */}
        {circles.map(({ cx: ccx, cy: ccy, done, label }) => (
          <motion.circle
            key={`s-${label}`}
            cx={ccx} cy={ccy} r={r}
            fill="none" stroke={accentColor} strokeWidth={1}
            animate={{ opacity: done ? 0.6 : 0.14 }}
            transition={T}
          />
        ))}

        {/* Labels in outer corners — with dark pill background for readability */}
        {circles.map(({ done, label, sublabel, lx, ly }) => {
          const labelW = label.length * 8 + 20
          const pillW = Math.max(labelW, sublabel.length * 6.2 + 20)
          return (
            <motion.g
              key={`lbl-${label}`}
              animate={{ opacity: done ? 1 : 0.35 }}
              transition={T}
            >
              {/* Dark background pill */}
              <rect
                x={lx - pillW / 2} y={ly - 22}
                width={pillW} height={34}
                rx={6} ry={6}
                fill="rgba(12,10,9,0.75)"
              />
              {/* Label */}
              <text
                x={lx} y={ly - 6}
                textAnchor="middle"
                fontSize="14"
                fontWeight="700"
                fill={accentColor}
                fontFamily="system-ui, sans-serif"
                letterSpacing="0.08em"
              >
                {label}
              </text>
              {/* Sublabel */}
              <text
                x={lx} y={ly + 9}
                textAnchor="middle"
                fontSize="10"
                fill="white"
                opacity="0.55"
                fontFamily="system-ui, sans-serif"
              >
                {sublabel}
              </text>
            </motion.g>
          )
        })}

        {/* Center ikigai dot */}
        <motion.circle
          cx={cx} cy={cy} r={18}
          fill={accentColor}
          animate={{ opacity: allDone ? 0.95 : 0.07, filter: allDone ? 'url(#dd-center-glow)' : 'none' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Center text */}
        <motion.g animate={{ opacity: allDone ? 1 : 0 }} transition={{ duration: 1, delay: 0.4 }}>
          <rect x={cx - 28} y={cy - 9} width={56} height={17} rx={3} fill="rgba(12,10,9,0.6)" />
          <text
            x={cx} y={cy + 4}
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fill={accentColor}
            fontFamily="system-ui, sans-serif"
            letterSpacing="0.14em"
          >
            IKIGAI
          </text>
        </motion.g>
      </svg>

      {/* Progress dots */}
      <div className="flex items-center gap-3">
        {circles.map(({ done, label }) => (
          <motion.div
            key={`dot-${label}`}
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: accentColor }}
            animate={{ opacity: done ? 1 : 0.18 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  )
}
