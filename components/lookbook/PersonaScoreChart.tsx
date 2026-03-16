'use client'

import type { Impact } from '@/types'
import { PERSONAS } from '@/lib/personas'

interface Props {
  tagCounts: Record<Impact, number>
  selectedPersonaKey: Impact
  onSelect: (key: Impact) => void
}

const PERSONA_ORDER: Impact[] = [
  'Social_Good',
  'Innovation',
  'Infrastructure',
  'Artistic',
  'Investigation',
]

export function PersonaScoreChart({ tagCounts, selectedPersonaKey, onSelect }: Props) {
  const maxCount = Math.max(...PERSONA_ORDER.map((k) => tagCounts[k] ?? 0), 1)

  return (
    <section className="lookbook-section border-t border-white/5 bg-stone-950 px-8 py-20">
      <p className="text-xs tracking-[0.3em] uppercase text-white/30 font-medium mb-3">
        identity breakdown
      </p>
      <h2
        className="text-4xl sm:text-5xl font-semibold tracking-tight text-white mb-10"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        how your vibes stacked up.
      </h2>

      <div className="space-y-3 max-w-lg">
        {PERSONA_ORDER.map((key) => {
          const persona = PERSONAS[key]
          const count = tagCounts[key] ?? 0
          const isSelected = key === selectedPersonaKey
          const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0

          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className="w-full text-left group"
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-32 text-sm font-medium shrink-0 transition-colors duration-200"
                  style={{ color: isSelected ? persona.accentColor : 'rgba(255,255,255,0.35)' }}
                >
                  {persona.title.replace('The ', '')}
                </span>

                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: persona.accentColor,
                      opacity: isSelected ? 1 : 0.35,
                    }}
                  />
                </div>

                <span
                  className="text-xs tabular-nums w-5 text-right shrink-0 transition-colors duration-200"
                  style={{ color: isSelected ? persona.accentColor : 'rgba(255,255,255,0.25)' }}
                >
                  {count}
                </span>

                {isSelected && (
                  <span className="text-[10px] text-white/30 shrink-0">✓ your vibe</span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <p className="mt-6 text-xs text-white/25">
        These scores reflect the images you chose. Tap any row to explore a different path.
      </p>
    </section>
  )
}
