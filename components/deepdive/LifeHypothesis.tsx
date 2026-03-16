'use client'

import { motion } from 'framer-motion'
import { IkigaiVenn } from './IkigaiVenn'

interface Props {
  manifesto: string
  top: string
  middle: string
  bottom: string
  mission: string
  economicsLabel: string
  accentColor: string
}

export function LifeHypothesis({
  manifesto,
  top,
  middle,
  bottom,
  mission,
  economicsLabel,
  accentColor,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' as const }}
      className="space-y-10"
    >
      {/* Venn fully lit */}
      <IkigaiVenn
        passionDone
        missionDone
        vocationDone
        accentColor={accentColor}
      />

      {/* Manifesto card */}
      <div
        className="rounded-2xl p-6 sm:p-8 border"
        style={{
          backgroundColor: accentColor + '0D',
          borderColor: accentColor + '30',
        }}
      >
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-4">
          your life hypothesis
        </p>
        <blockquote
          className="text-lg sm:text-xl text-white/85 leading-relaxed"
          style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}
        >
          &ldquo;{manifesto}&rdquo;
        </blockquote>
      </div>

      {/* Stack summary */}
      <div className="space-y-2">
        <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-3">the stack</p>
        {[
          { rank: '01', word: top, weight: '50%', label: 'Primary' },
          { rank: '02', word: middle, weight: '30%', label: 'Secondary' },
          { rank: '03', word: bottom, weight: '20%', label: 'Flavor' },
        ].map(({ rank, word, weight, label }) => (
          <div key={rank} className="flex items-baseline gap-3">
            <span className="text-[10px] text-white/20 font-mono w-5">{rank}</span>
            <span className="text-sm font-bold tracking-[0.1em]" style={{ color: accentColor }}>
              {word}
            </span>
            <span className="text-xs text-white/25">{weight} · {label}</span>
          </div>
        ))}
        <div className="pt-2 flex flex-wrap gap-4 text-xs text-white/30">
          <span>Mission: <span className="text-white/50">{mission}</span></span>
          <span>Path: <span className="text-white/50">{economicsLabel}</span></span>
        </div>
      </div>

    </motion.div>
  )
}
