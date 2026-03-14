'use client'

import { useEffect, useState } from 'react'
import { PHASE_CONFIGS, poolKey } from '@/lib/unsplash'
import type { Impact, QuizImage } from '@/types'

const IMPACTS: Impact[] = ['Social_Good', 'Innovation', 'Infrastructure', 'Artistic', 'Investigation']
const PHASES = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'branch'] as const

const PHASE_LABELS: Record<string, string> = {
  q1: 'Q1 — What space calls to you?',
  q2: 'Q2 — What kind of work lights you up?',
  q3: 'Q3 — Where do you see yourself making a difference?',
  q4: 'Q4 — What challenge energizes you?',
  q5: 'Q5 — Who do you want around you?',
  q6: 'Q6 — What does success feel like?',
  q7: 'Q7 — Where does your future unfold?',
  branch: 'Lookbook — Moodboard supplemental images',
}

const IMPACT_LABELS: Record<Impact, string> = {
  Social_Good: 'Social Good',
  Innovation: 'Innovation',
  Infrastructure: 'Infrastructure',
  Artistic: 'Artistic',
  Investigation: 'Investigation',
}

const UNSPLASH_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
const PEXELS_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY

type CandidateMap = Record<string, QuizImage[]>
type SelectionMap = Record<string, QuizImage[]>

async function fetchCandidates(phase: string, impact: Impact): Promise<QuizImage[]> {
  const config = PHASE_CONFIGS[phase][impact]
  const results: QuizImage[] = []

  // Unsplash
  if (UNSPLASH_KEY) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(config.query)}&per_page=5&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
      )
      if (res.ok) {
        const data = await res.json()
        for (const p of (data.results ?? []).slice(0, 5)) {
          results.push({
            id: p.id,
            url: p.urls.regular,
            alt: p.alt_description ?? p.description ?? config.query,
            tags: config.tags,
            pool: impact,
          })
        }
      }
    } catch { /* ignore */ }
  }

  // Pexels — fill remaining slots up to 5 total
  if (results.length < 5 && PEXELS_KEY && PEXELS_KEY !== 'your_pexels_api_key_here') {
    try {
      const need = 5 - results.length
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(config.query)}&per_page=${need}&orientation=landscape`,
        { headers: { Authorization: PEXELS_KEY } }
      )
      if (res.ok) {
        const data = await res.json()
        for (const p of (data.photos ?? []).slice(0, need)) {
          results.push({
            id: `pexels_${p.id}`,
            url: p.src.large2x || p.src.large,
            alt: p.alt || config.query,
            tags: config.tags,
            pool: impact,
          })
        }
      }
    } catch { /* ignore */ }
  }

  return results
}

export default function CuratePage() {
  const [candidates, setCandidates] = useState<CandidateMap>({})
  const [selections, setSelections] = useState<SelectionMap>({})
  const [loadedCount, setLoadedCount] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const totalPools = PHASES.length * IMPACTS.length // 40

  useEffect(() => {
    const load = async () => {
      for (const phase of PHASES) {
        for (const impact of IMPACTS) {
          const key = poolKey(phase, impact)
          const images = await fetchCandidates(phase, impact)
          setCandidates(prev => ({ ...prev, [key]: images }))
          setLoadedCount(prev => prev + 1)
        }
      }
    }
    load()
  }, [])

  const toggleImage = (key: string, image: QuizImage) => {
    setSelections(prev => {
      const current = prev[key] ?? []
      const exists = current.some(img => img.id === image.id)
      return {
        ...prev,
        [key]: exists ? current.filter(img => img.id !== image.id) : [...current, image],
      }
    })
    setSaved(false)
  }

  const curatedPoolCount = Object.values(selections).filter(arr => arr.length > 0).length

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/save-curation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selections),
      })
      if (res.ok) setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-950 text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-stone-950/95 backdrop-blur border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Image Curation</h1>
          <p className="text-xs text-white/40 mt-0.5">
            {loadedCount < totalPools
              ? `Loading… ${loadedCount} / ${totalPools} pools`
              : `${curatedPoolCount} / ${totalPools} pools curated`}
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || curatedPoolCount === 0}
          className="px-5 py-2 rounded-lg text-sm font-medium transition-all
            bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Curation'}
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/10">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${(curatedPoolCount / totalPools) * 100}%` }}
        />
      </div>

      {/* Phase groups */}
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
        {PHASES.map(phase => (
          <div key={phase}>
            <h2 className="text-base font-semibold text-white/80 mb-6 pb-2 border-b border-white/10">
              {PHASE_LABELS[phase]}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {IMPACTS.map(impact => {
                const key = poolKey(phase, impact)
                const pool = candidates[key] ?? []
                const selected = selections[key] ?? []
                const isLoaded = key in candidates

                return (
                  <div key={key}>
                    <p className="text-xs text-white/40 font-medium tracking-wide uppercase mb-2">
                      {IMPACT_LABELS[impact]}
                      {selected.length > 0 && (
                        <span className="ml-2 text-emerald-400">✓ {selected.length}</span>
                      )}
                    </p>
                    <div className="space-y-2">
                      {!isLoaded ? (
                        // Loading skeleton
                        Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="aspect-video rounded-lg bg-white/5 animate-pulse" />
                        ))
                      ) : pool.length === 0 ? (
                        <div className="aspect-video rounded-lg bg-white/5 flex items-center justify-center">
                          <span className="text-xs text-white/20">No results</span>
                        </div>
                      ) : (
                        pool.map(image => {
                          const isSelected = selected.some(img => img.id === image.id)
                          return (
                            <button
                              key={image.id}
                              onClick={() => toggleImage(key, image)}
                              className={`relative w-full aspect-video rounded-lg overflow-hidden block transition-all
                                ${isSelected
                                  ? 'ring-2 ring-emerald-400 ring-offset-2 ring-offset-stone-950'
                                  : 'ring-1 ring-white/10 hover:ring-white/30'
                                }`}
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={image.url}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                              />
                              {isSelected && (
                                <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                                  <span className="text-white text-xl font-bold drop-shadow">✓</span>
                                </div>
                              )}
                            </button>
                          )
                        })
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky save footer */}
      {curatedPoolCount > 0 && (
        <div className="fixed bottom-0 inset-x-0 bg-stone-900 border-t border-white/10 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-white/60">
            <span className="text-white font-medium">{curatedPoolCount}</span> of {totalPools} pools selected
          </p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 transition-all"
          >
            {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save Curation'}
          </button>
        </div>
      )}
    </div>
  )
}
